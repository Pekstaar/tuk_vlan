const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { getErrorMessage } = require("../middleware/errorMiddleWare");
const extend = require("lodash/extend");
const formidable = require("formidable");
const fs = require("fs");
// const defaultImage = require("../assets/default.png");
// import extend from "lodash/extend";
//@desc     Get or Search all users
//@route           GET /api/user?search=p
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { registration: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, reg } = req.body;

  if (!name || !email || !password || !reg) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  // Check if user exists
  const existingUser = await User.findOne({ registration: reg });

  if (existingUser !== null) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    registration: reg,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      registration: user.registration,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email_reg, password } = req.body;

  // Check for user email
  const user = await User.findOne({
    $or: [{ email: email_reg }, { registration: email_reg }],
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      registration: user.registration,
      photo: user.photo,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(await User.findById(req.user._id));
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

// SOCIAL CONTROLLERS:
const photo = (req, res, next) => {
  if (req.user.photo.data) {
    res.set("Content-Type", req.user.photo.contentType);

    return res.send(req.user.photo.data);
  }

  next();
};

const defaultPhoto = (_req, res) => {
  return res.sendFile(process.cwd() + "");
};

// @desc    Add user to following friend
// @route   PUT /api/users/follow
// @access  private
const addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $push: { following: req.body.followId },
    });

    next();
  } catch (error) {
    return res.status(400).json({
      error: getErrorMessage,
    });
  }
};

const addFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.user._id } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();

    res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

// @desc    Remove follower
// @route   PUT /api/users/unfollow
// @access  private
const removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: req.body.unfollowId },
    });
    next();
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const removeFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.user._id } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

// @desc    Search for new friends to follow
// @route   GET /api/users/findpeople/
// @access  private
const findMorePeople = async (req, res) => {
  let following = req.user.following;

  following.push(req.user._id);
  try {
    let users = await User.find({ _id: { $nin: following } }).select(
      "name _id"
    );
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:userId
// @access  private
const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    let user = await User.findById(req.user._id);
    user = extend(user, fields);
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.filepath);
      user.photo.contentType = files.photo.type;
    }
    try {
      await user.save();

      res.json(user);
    } catch (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
  allUsers,
  update,

  photo,
  defaultPhoto,

  addFollowing,
  addFollower,

  removeFollowing,
  removeFollower,

  findMorePeople,
};
