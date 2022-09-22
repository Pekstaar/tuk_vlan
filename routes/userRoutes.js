const router = require("express").Router();
const userCtrl = require("../controllers/userController");

const { registerUser, loginUser, allUsers } = userCtrl;
const { protect } = require("../middleware/authMiddleWare");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/").get(protect, allUsers);

// social routes
router.route("/photo/:userId").get(userCtrl.photo, userCtrl.defaultPhoto);
router.route("/defaultPhoto").get(userCtrl.defaultPhoto);

router
  .route("/follow")
  .put(protect, userCtrl.addFollowing, userCtrl.addFollower);
router
  .route("/unfollow")
  .put(protect, userCtrl.removeFollowing, userCtrl.removeFollower);

router.route("/findpeople").get(protect, userCtrl.findMorePeople);

router
  .route("/:userId")
  .get(protect, userCtrl.getMe)
  .put(protect, userCtrl.update);
// .delete(protect, authCtrl.hasAuthorization, userCtrl.remove)

module.exports = router;
