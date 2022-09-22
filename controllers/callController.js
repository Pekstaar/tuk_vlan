const asyncHandler = require("express-async-handler");
const Call = require("../models/CallModel");

const saveCallId = asyncHandler(async (req, res) => {
  try {
    const exists = await Call.findOne({ id: req.body.id });

    if (exists) {
      res.send("Meeting exists");
      return;
    }

    await Call.create(req.body);

    res.send("Call saved");
  } catch (error) {
    throw new Error(error.message);
  }
});

const getCallId = asyncHandler(async (req, res) => {
  try {
    const { id, signalData } = await Call.findOne({
      id: req.params.id,
    }).populate("");

    res.send({ id, signalData });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = {
  saveCallId,
  getCallId,
};
