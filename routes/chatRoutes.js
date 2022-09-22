const router = require("express").Router();

const { protect } = require("../middleware/authMiddleWare");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatController");

// Chat routes:
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/group_remove").put(protect, removeFromGroup);
router.route("/group_add").put(protect, addToGroup);

module.exports = router;
