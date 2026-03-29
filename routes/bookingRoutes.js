const express = require("express");
const router = express.Router();

const db = require("../config/db");

// BOOK ROOM
router.post("/", (req, res) => {
  const { user_id, room_id, check_in, check_out } = req.body;

  if (!user_id || !room_id || !check_in || !check_out) {
    return res.status(400).json({ message: "All fields required" });
  }

  // Check if room already booked in that date
  const query = `
    SELECT * FROM bookings 
    WHERE room_id = ? 
    AND (check_in <= ? AND check_out >= ?)
  `;

  db.query(query, [room_id, check_out, check_in], (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "Room not available for selected dates" });
    }

    // Insert booking
    db.query(
      "INSERT INTO bookings (user_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?)",
      [user_id, room_id, check_in, check_out],
      (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Room booked successfully" });
      }
    );
  });
});


// GET ALL BOOKINGS
router.get("/", (req, res) => {
  db.query("SELECT * FROM bookings", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

module.exports = router;