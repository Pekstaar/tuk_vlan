const router = require("express").Router();

const postCtrl = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleWare");

router.route("/new/").post(protect, postCtrl.create);
router.route("/photo/:postId").get(postCtrl.postByID, postCtrl.photo);

router.route("/by/:userId").get(protect, postCtrl.listByUser);
router.route("/feed").get(protect, postCtrl.listNewsFeed);

router.route("/like").put(protect, postCtrl.like);
router.route("/unlike").put(protect, postCtrl.unlike);

router.route("/comment").put(protect, postCtrl.comment);
router.route("/uncomment").put(protect, postCtrl.uncomment);

router
  .route("/delete/:postId")
  .delete(protect, postCtrl.isPoster, postCtrl.remove);

router.param("postId", postCtrl.postByID);

module.exports = router;
