const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getMessages,
  postMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/messageController");

router.use(requireAuth);

router.get("/:idConversation", getMessages);
router.post("/:idConversation", postMessage);
router.delete("/:id", deleteMessage);
router.patch("/:id", updateMessage);

module.exports = router;
