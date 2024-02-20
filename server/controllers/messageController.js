const mongoose = require("mongoose");
const Message = require("../models/messageModel");

const getMessages = async (req, res) => {
  try {
    const { idConversation } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    const messages = await Message.find({ conversationId: idConversation });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postMessage = async (req, res) => {
  try {
    const { idConversation } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    const message = new Message({
      ...req.body,
      conversationId: idConversation,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No message with that id");

    const deleted = await Message.findByIdAndDelete({ _id: id });
    if (deleted) {
      return res.status(200).send("Message deleted");
    }
    throw new Error("Message not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No message with that id");

    const updateMessage = await Message.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!updateMessage) return res.status(404).send("No message with that id");

    res.status(200).json(updateMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const replyMessage = async (req, res) => {
  try {
    const { idMessage } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idMessage))
      return res.status(404).send("No message with that id");

    const message = await Message.findById(idMessage);
    if (!message) return res.status(404).send("No message with that id");

    const reply = new Message({
      ...req.body,
      replyTo: idMessage,
      isReply: true,
    });
    await reply.save();
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMessages,
  postMessage,
  deleteMessage,
  updateMessage,
};
