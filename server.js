const express = require("express");
console.log("CRUD USERS API STARTED");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

// In-memory storage (HashMap)
let users = {};

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// CREATE USER
app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({ error: "Name, email and age are required" });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    const id = uuidv4();
    const user = { id, name, email, age };

    users[id] = user;

    res.status(201).json(user);
});

// GET ALL USERS
app.get("/users", (req, res) => {
    res.status(200).json(Object.values(users));
});

// GET SINGLE USER
app.get("/users/:id", (req, res) => {
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
});

// UPDATE USER
app.put("/users/:id", (req, res) => {
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const { name, email, age } = req.body;

    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    users[req.params.id] = {
        ...user,
        name: name || user.name,
        email: email || user.email,
        age: age || user.age
    };

    res.status(200).json(users[req.params.id]);
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    delete users[req.params.id];

    res.status(200).json({ message: "User deleted successfully" });
});

// SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});