const Message = require("../models/message.js");
const json = require("../utils/jsonresponse.js");

const submitMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (message && message.length > 500)
      return json(res, 500, "Maximum 500 characters are allowed");

    const newMessage = new Message({ message });
    await newMessage.save();
    json(res, 201, "Message added successfully");
  } catch (error) {
    json(res, 500, error.message);
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({})
      .select("message createdAt")
      .sort({ createdAt: -1 })
      .lean();
    json(res, 200, null, messages);
  } catch (error) {
    json(res, 500, error.message);
  }
};

module.exports = {
  submitMessage,
  getMessages,
};
