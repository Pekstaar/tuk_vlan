const mongoose = require("mongoose");

const errorModel = mongoose.Schema(
  {
    error:{type:Object}
  },
  { timestamps: true }
);

const Error = mongoose.model("Error", errorModel);

module.exports = Error;
