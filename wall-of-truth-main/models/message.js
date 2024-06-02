const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      maxLength: [500, "Maximum 500 characters are allowed"],
    },
  },
  { timestamps: true },
);

const message = mongoose.model("Message", messageSchema);
module.exports = message;
