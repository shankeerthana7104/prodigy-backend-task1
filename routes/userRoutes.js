const express = require("express");
const router = express.Router();

const User = require("../models/User");
const redisClient = require("../config/redis");

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);

    // ❌ Clear cache
    await redisClient.del("users");

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL USERS (WITH CACHE)
router.get("/", async (req, res) => {
  try {
    const cacheData = await redisClient.get("users");

    // ✅ If cache exists
    if (cacheData) {
      console.log("⚡ Data from Redis");
      return res.json(JSON.parse(cacheData));
    }

    // ❌ If no cache → fetch from DB
    const users = await User.find();

    // Save to Redis (expire in 60 sec)
    await redisClient.setEx("users", 60, JSON.stringify(users));

    console.log("🐢 Data from MongoDB");
    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SINGLE USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // ❌ Clear cache
    await redisClient.del("users");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    // ❌ Clear cache
    await redisClient.del("users");

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;