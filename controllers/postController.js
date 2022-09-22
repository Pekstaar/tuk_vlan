const formidable = require("formidable");
const fs = require("fs");
const { getErrorMessage } = require("../middleware/errorMiddleWare");
const Post = require("../models/Post.model");

// @desc    create new post
// @route   POST /api/users/follow
// @access  private
const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let post = new Post(fields);
    post.postedBy = req.user._id;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.filepath);
      post.photo.contentType = files.photo.type;
    }
    try {
      let result = await post.save();

      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: getErrorMessage(err),
      });
    }
  });
};

const postByID = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.postId)
      .populate("postedBy", "_id name")
      .exec();

    if (!post)
      return res.status("400").json({
        error: "Post not found",
      });
    req.post = post;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve post",
    });
  }
};

const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
};

const listByUser = async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.user._id })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec();
    res.json(posts);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const listNewsFeed = async (req, res) => {
  let following = req.user.following;
  following.push(req.user._id);
  try {
    let posts = await Post.find({ postedBy: { $in: req.user.following } })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-createdAt")
      .exec();
    res.json(posts);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const like = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const unlike = async (req, res) => {
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const comment = async (req, res) => {
  let comment = req.body.comment;
  // comment.postedBy = req.body.userId
  comment.postedBy = req.user._id;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};
const uncomment = async (req, res) => {
  let comment = req.body.comment;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $pull: { comments: { _id: comment._id } } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const isPoster = (req, res, next) => {
  let isPoster = req.post && req.user && req.post.postedBy._id == req.user._id;
  if (!isPoster) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

const remove = async (req, res) => {
  let post = req.post;
  try {
    let deletedPost = await post.remove();
    res.json(deletedPost);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

module.exports = {
  create,
  postByID,
  photo,
  listByUser,
  listNewsFeed,
  like,
  unlike,
  comment,
  uncomment,
  isPoster,
  remove,
};
