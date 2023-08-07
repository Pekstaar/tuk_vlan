const router = require("express").Router();

const errorCtrl = require("../controllers/errorController");

router.route('/add/').post(errorCtrl.create)

module.exports = router;