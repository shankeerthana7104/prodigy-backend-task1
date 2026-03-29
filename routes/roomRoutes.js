const express = require("express");
const router = express.Router();

const db = require("../config/db");

// CREATE ROOM
router.post("/", (req, res) => {
  const { title, price, description, created_by } = req.body;

  if (!title || !price || !description || !created_by) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO rooms (title, price, description, created_by) VALUES (?, ?, ?, ?)",
    [title, price, description, created_by],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Room created successfully" });
    }
  );
});


// GET ALL ROOMS
router.get("/", (req, res) => {
  db.query("SELECT * FROM rooms", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

module.exports = router;

router.get("/search", (req, res) => {
  const { check_in, check_out } = req.query;

  if (!check_in || !check_out) {
    return res.status(400).json({ message: "Provide check_in and check_out" });
  }

  const query = `
    SELECT * FROM rooms 
    WHERE id NOT IN (
      SELECT room_id FROM bookings 
      WHERE (check_in <= ? AND check_out >= ?)
    )
  `;

  db.query(query, [check_out, check_in], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});