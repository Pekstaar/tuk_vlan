const asyncHandler = require("express-async-handler");
const Chat = require("../models/ChatModel");
const User = require("../models/User");

// @desc    fetch/initiate new chat
// @route   POST /api/chat
// @access  public
const accessChat = asyncHandler(async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    res.status(400);
    throw new Error("User id not provided!");
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: uid } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, uid],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// @desc    fetch chats
// @route   get /api/chat
// @access  public
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).json(results);
      });
    //   .then((result) => res.status(200).send(result))
    //   .catch((err) => {
    //     throw err;
    //   });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

// @desc    create group chat
// @route   POST /api/chat/group
// @access  public
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(400);
    throw new Error("Please provide all fields!");
  }

  var users = JSON.parse(req?.body?.users);

  if (users?.length < 2) {
    res.status(400);

    throw new Error("A minimum of 2 members are required!");
  }

  users.push(req?.user);

  try {
    const groupChat = await Chat.create({
      chatName: req?.body?.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req?.user,
    });

    const savedGroupChat = await Chat.findOne({ _id: groupChat?._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(savedGroupChat);
  } catch (error) {
    res.status(400);
    throw error;
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chat_id, chat_name } = req?.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chat_id,
    {
      chatName: chat_name,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);

    throw new Error("Chat not found!");
  } else {
    res.status(200).json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chat_id, uid } = req?.body;

  const added = await Chat.findByIdAndUpdate(
    chat_id,
    {
      $addToSet: { users: uid },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);

    throw new Error("Chat not found!");
  } else {
    res.status(200).json(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chat_id, uid } = req?.body;

  const removed = await Chat.findByIdAndUpdate(
    chat_id,
    {
      $pull: { users: uid },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);

    throw new Error("Chat not found!");
  } else {
    res.status(200).json(removed);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
