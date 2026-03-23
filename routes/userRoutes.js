
const role = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// GET all users (Protected)
router.get("/", auth, role("admin"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET single user
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// UPDATE user
router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE user (Protected)
router.delete("/:id", auth, role("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;