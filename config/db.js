const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", // 👉 your MySQL password
  database: "hotel_booking"
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection failed:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;