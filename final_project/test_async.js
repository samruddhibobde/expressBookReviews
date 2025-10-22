const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// Task 10: Get all books using async/await
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log("Task 10: Get all books");
        console.log(response.data);
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
    }
}

// Task 11: Get book by ISBN using Promises
function getBookByISBN(isbn) {
    axios.get(`${BASE_URL}/isbn/${isbn}`)
        .then(res => {
            console.log("Task 11: Get book by ISBN");
            console.log(res.data);
        })
        .catch(err => {
            console.error(err.response ? err.response.data : err.message);
        });
}

// Task 12: Get books by Author using async/await
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/author/${author}`);
        console.log("Task 12: Get books by Author");
        console.log(response.data);
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
    }
}

// Task 13: Get books by Title using Promises
function getBooksByTitle(title) {
    axios.get(`${BASE_URL}/title/${title}`)
        .then(res => {
            console.log("Task 13: Get books by Title");
            console.log(res.data);
        })
        .catch(err => {
            console.error(err.response ? err.response.data : err.message);
        });
}

// Call functions to test
getAllBooks();
getBookByISBN(1);
getBooksByAuthor("Chinua Achebe");
getBooksByTitle("Things Fall Apart");
