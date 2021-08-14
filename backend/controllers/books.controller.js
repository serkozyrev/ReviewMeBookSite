const fetch = require("node-fetch");
require("dotenv").config();

module.exports.getAllBooks = (q, maxResults) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${process.env.API_KEY}&maxResults=${maxResults}`
    )
      .then((response) => response.json())
      .then((json) => {
        resolve({ errCode: 0, books: json });
      })
      .catch((error) => {
        reject({ errCode: 1, message: "error while getting books" });
      });
  });
};

module.exports.getBooksByID = (id) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.API_KEY}`
    )
      .then((response) => response.json())
      .then((json) => {
        resolve({ errCode: 0, books: json });
      })
      .catch((error) => {
        reject({ errCode: 1, message: "error while getting books id" });
      });
  });
};

module.exports.getBooksBySearch = (q) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${process.env.API_KEY}&maxResults=40`
    )
      .then((response) => response.json())
      .then((json) => {
        resolve({ errCode: 0, books: json });
      })
      .catch((error) => {
        reject({ errCode: 1, message: "error while getting books search" });
      });
  });
};
