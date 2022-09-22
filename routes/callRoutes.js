const router = require("express").Router();

const { protect } = require("../middleware/authMiddleWare");
const { saveCallId, getCallId } = require("../controllers/callController");

// Chat routes:
router.route("/save-call-id").post(protect, saveCallId);
router.route("/get_call_id/:id").get(protect, getCallId);

module.exports = router;
