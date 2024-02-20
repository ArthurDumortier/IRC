const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, "azbededeeezzefefzafsdqfdqsfvcq", {
    expiresIn: "3d",
  });
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No user with that id");
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { mail, username, password } = req.body;
    const user = new User({ mail, username, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No user with that id");
    const deleted = await User.findByIdAndDelete({ _id: id });
    const deleteMessage = await Message.deleteMany({ userId: id });
    const deleteConversation = await Conversation.deleteMany({
      "participants.userId": id,
    });
    if (deleted && deleteMessage && deleteConversation) {
      return res.status(200).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No user with that id");

    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!updateUser) return res.status(404).send("No user with that id");

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    // Create a user object without password
    const userObj = {
      _id: user._id,
      email: user.email,
      username: user.username,
      super: user.super,
      profilPic: user.profilPic,
      bio: user.bio,
      token, // Added token for test purposes
    };

    res.status(200).json(userObj); // Return the user object
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await User.signup(email, username, password);

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  signupUser,
  loginUser,
};
