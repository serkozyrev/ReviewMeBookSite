const BooksControllers = require("../backend/controllers/books.controller");
jest.mock("node-fetch");
const fetch = require("node-fetch");
const { Response } = jest.requireActual("node-fetch");
require("dotenv").config();

test("Test get all books controller", async () => {
  fetch.mockReturnValue(Promise.resolve(new Response("1")));
  const books = await BooksControllers.getAllBooks();
  expect(books).toEqual({ books: 1, errCode: 0 });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://www.googleapis.com/books/v1/volumes?q=fiction&key=${process.env.API_KEY}&maxResults=15`
  );
});

test("Test get books by id controller with correct id", () => {
  return BooksControllers.getBooksByID("_oG_iTxP1pIC")
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test get books by id controller with empty id", () => {
  return BooksControllers.getBooksByID("")
    .then((res) => {
      expect(res.errCode).toBe(undefined);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test get books by id controller with wrong id", () => {
  return BooksControllers.getBooksByID("Wrong ID String")
    .then((res) => {
      expect(res.errCode).toBe(undefined);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test get books by search controller with title author", () => {
  return BooksControllers.getBooksBySearch(
    "Flowers for Algernon",
    "Daniel Keyes"
  )
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test get books by search controller with empty fields", () => {
  return BooksControllers.getBooksBySearch("", "")
    .then((res) => {
      expect(res.errCode).toBe(undefined);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test get books by search controller with title and empty author", () => {
  return BooksControllers.getBooksBySearch("Flowers for Algernon", "")
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test get books by search controller with empty title and author", () => {
  return BooksControllers.getBooksBySearch("", "Daniel Keyes")
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});
