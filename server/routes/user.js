const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  createUser,
  loginUser,
  signupUser,
} = require("../controllers/userController");

// Public routes
router.post("/login", loginUser);
router.post("/signup", signupUser);

// Apply the requireAuth middleware to all routes below it
router.use(requireAuth);

// Protected routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
