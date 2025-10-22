const express = require('express');
const books = require("./booksdb.js"); // preloaded book data
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully" });
});

// Task 1: Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.send(JSON.stringify(books, null, 4));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = Number(req.params.isbn); // convert param to number
    if (books[isbn]) {
        return res.send(JSON.stringify(books[isbn], null, 4));
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Task 3: Get book details based on Author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();
    const result = Object.values(books).filter(book => book.author.toLowerCase() === author);
    if (result.length > 0) {
        return res.send(JSON.stringify(result, null, 4));
    } else {
        return res.status(404).json({ message: "No books found by this author" });
    }
});

// Task 4: Get book details based on Title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    const result = Object.values(books).filter(book => book.title.toLowerCase() === title);
    if (result.length > 0) {
        return res.send(JSON.stringify(result, null, 4));
    } else {
        return res.status(404).json({ message: "No books found with this title" });
    }
});

// Task 5: Get book review based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = Number(req.params.isbn);
    if (books[isbn]) {
        return res.send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Task 12: Get book details by Author using async/await
public_users.get('/async/author/:author', async (req, res) => {
    const author = req.params.author.toLowerCase();
    try {
        const result = await new Promise((resolve, reject) => {
            const booksByAuthor = Object.values(books).filter(
                book => book.author.toLowerCase() === author
            );
            if (booksByAuthor.length > 0) resolve(booksByAuthor);
            else reject("No books found by this author");
        });
        return res.send(JSON.stringify(result, null, 4));
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

// Task 13: Get book details by Title using async/await
public_users.get('/async/title/:title', async (req, res) => {
    const title = req.params.title.toLowerCase();
    try {
        const result = await new Promise((resolve, reject) => {
            const booksByTitle = Object.values(books).filter(
                book => book.title.toLowerCase() === title
            );
            if (booksByTitle.length > 0) resolve(booksByTitle);
            else reject("No books found with this title");
        });
        return res.send(JSON.stringify(result, null, 4));
    } catch (error) {
        return res.status(404).json({ message: error });
    }
});

module.exports.general = public_users;
