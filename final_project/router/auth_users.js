const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = []; // registered users

// Helper function to check if username is valid (non-empty)
const isValid = (username) => {
    return typeof username === "string" && username.trim().length > 0;
}

// Helper function to authenticate user credentials
const authenticatedUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
}

// Task 7: User login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (authenticatedUser(username, password)) {
        // Generate JWT token
        const accessToken = jwt.sign({ username }, "access", { expiresIn: "1h" });
        req.session.authorization = { accessToken };
        return res.status(200).json({ message: "User logged in successfully", accessToken });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Task 8 & 9: Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = Number(req.params.isbn);
    const username = req.user.username;
    const { review } = req.body;

    if (!review) {
        return res.status(400).json({ message: "Review text is required" });
    }

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Add or update review
    books[isbn].reviews[username] = review;
    return res.status(200).json({
        message: `Review added/updated for ISBN ${isbn}`,
        reviews: books[isbn].reviews
    });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
