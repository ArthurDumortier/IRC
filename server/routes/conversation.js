const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getConversationsOfAnUser,
  getPublicConversations,
  getConversation,
  createConversation,
  deleteConversation,
  joinPublicConversation,
  updateConversation,
  searchConversation,
  addUserInConversation,
  setConversationInPublic,
  blacklistUserInConversation,
  removeBlacklistUserInConversation,
  removeUserInConversation,
  setConversationInPrivate,
} = require("../controllers/conversationController");

router.use(requireAuth);

router.get("/", (req, res) => {
  res.send("Hello from conversation routes");
});
router.get("/:idUser", getConversationsOfAnUser);
router.get("/public", getPublicConversations);
router.post("/public/:idConversation/:idUser", joinPublicConversation);
router.get("/:idUser/:idConversation", getConversation);
router.post("/:userId", createConversation);
router.delete("/:idConversation", deleteConversation);
router.patch("/:idConversation", updateConversation);
router.post("/search", searchConversation);
router.post("/:idConversation/add/:idUser", addUserInConversation);
router.post("/:idConversation/public", setConversationInPublic);
router.post("/:idConversation/blacklist/:idUser", blacklistUserInConversation);
router.post("/:idConversation/removeBlacklist/:idUser", removeBlacklistUserInConversation);
router.post("/:idConversation/remove/:idUser", removeUserInConversation);
router.post("/:idConversation/private", setConversationInPrivate);

module.exports = router;
