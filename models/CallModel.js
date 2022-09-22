const mongoose = require("mongoose");

const callModel = mongoose.Schema(
  {
    id: { type: String, unique: true },
    signalData: {
      sdp: { type: String },
      type: { type: String },
    },
  },
  { timestamps: true }
);

const Call = mongoose.model("Call", callModel);

module.exports = Call;
