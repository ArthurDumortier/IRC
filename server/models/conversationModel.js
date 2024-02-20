const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conversationSchema = new Schema(
  {
    blacklist: {
      type: [
        { user: { type: Schema.Types.ObjectId, ref: "User", default: null } },
      ],
    },
    participants: {
      type: [
        {
          userId: { type: String, default: null },
          role: { type: String, default: "User" },
          joinTimestamp: { type: Date, default: Date.now },
        },
      ],
    },
    visibility: { type: Array, default: ["Private"] },
    title: { type: String, required: true },
    picture: {
      type: String,
      default: "https://api.dicebear.com/7.x/shapes/svg",
    },
    description: { type: String, default: "Please add a description..." },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
