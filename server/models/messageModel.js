const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    reply: {
      type: [
        {
          isReply: { type: Boolean, default: false },
          replyMessageId: { type: String, default: null },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
