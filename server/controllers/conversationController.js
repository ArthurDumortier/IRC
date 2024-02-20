const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const mongoose = require("mongoose");

const getConversationsOfAnUser = async (req, res) => {
  try {
    const { idUser } = req.params;

    // Get conversations where the user is a participant or if the conversation is public
    const conversations = await Conversation.find({
      "participants.userId": idUser,
    });

    if (!conversations)
      return res.status(404).send("Aucune conversation correspondante");

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message + id });
  }
};

const getPublicConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ private: false });

    if (!conversations)
      return res.status(404).send("Aucune conversation publique");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const joinPublicConversation = async (req, res) => {
  try {
    const { idUser, idConversation } = req.params;

    const conversation = await Conversation.findById(idConversation);
    if (!conversation)
      return res.status(404).send("No conversation with that id");

    conversation.participants.push({ userId: idUser });

    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { idUser, idConversation } = req.params;
    console.log(idUser, idConversation);
    if (!mongoose.Types.ObjectId.isValid(idUser))
      return res.status(404).send("No conversation with that id");

    const conversation = await Conversation.findById(idConversation);

    if (!conversation)
      return res.status(404).send("No conversation with that id");

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversation = new Conversation({
      ...req.body,
      participants: [{ userId: userId, role: "Admin" }],
    });

    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteConversation = async (req, res) => {
  try {
    const { idConversation } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    await Conversation.findByIdAndDelete({ _id: idConversation });
    await Message.deleteMany({ conversationId: idConversation });
    res.status(200).send("Conversation deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateConversation = async (req, res) => {
  try {
    const { idConversation } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    const updateConversation = await Conversation.findByIdAndUpdate(
      { _id: idConversation },
      {
        ...req.body,
      }
    );
    if (!updateConversation)
      return res.status(404).send("No conversation with that id");

    res.status(200).json(updateConversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUserInConversation = async (req, res) => {
  try {
    const { idConversation, idUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    // Check if the user is already in the conversation
    const conversation = await Conversation.findById(idConversation);
    if (!conversation)
      return res.status(404).send("No conversation with that id");

    const userInConversation = conversation.participants.find(
      (participant) => participant.userId === idUser
    );

    if (userInConversation)
      return res.status(400).send("User already in the conversation");

    conversation.participants.push({ userId: idUser });

    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeUserInConversation = async (req, res) => {
  try {
    const { idConversation, idUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    const conversation = await Conversation.findById(idConversation);
    if (!conversation)
      return res.status(404).send("No conversation with that id");

    conversation.participants = conversation.participants.filter(
      (participant) => participant.userId !== idUser
    );

    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchConversation = async (req, res) => {
  const { title, userId } = req.body;
  try {
    const conversations = await Conversation.find({
      $or: [
        { "participants.userId": userId },
        { title: { $regex: title, $options: "i" } },
      ],
    });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setConversationInPrivate = async (req, res) => {
  try {
    const { idConversation } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    const conversation = await Conversation.findById(idConversation);
    if (!conversation)
      return res.status(404).send("No conversation with that id");

    conversation.private = true;

    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setConversationInPublic = async (req, res) => {
  try {
    const { idConversation } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    const conversation = await Conversation.findById(idConversation);
    if (!conversation)
      return res.status(404).send("No conversation with that id");

    conversation.private = false;

    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const blacklistUserInConversation = async (req, res) => {
  try {
    const { idConversation, idUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    const conversation = await Conversation.findById(idConversation);
    if (!conversation)
      return res.status(404).send("No conversation with that id");

    conversation.blacklist.push({ user: idUser });
    conversation.participants = conversation.participants.filter(
      (participant) => participant.user !== idUser
    );

    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeBlacklistUserInConversation = async (req, res) => {
  try {
    const { idConversation, idUser } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idConversation))
      return res.status(404).send("No conversation with that id");

    const conversation = await Conversation.findById(idConversation);
    if (!conversation)
      return res.status(404).send("No conversation with that id");

    conversation.blacklist = conversation.blacklist.filter(
      (participant) => participant.user !== idUser
    );

    await conversation.save();

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getConversationsOfAnUser,
  getPublicConversations,
  getConversation,
  createConversation,
  searchConversation,
  deleteConversation,
  joinPublicConversation,
  updateConversation,
  addUserInConversation,
  removeUserInConversation,
  setConversationInPrivate,
  setConversationInPublic,
  blacklistUserInConversation,
  removeBlacklistUserInConversation,
};
