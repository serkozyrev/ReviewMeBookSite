import React, { useState, useEffect } from "react";

import BookLoading from "../style/BookLoading";
import Home from "./Home";
import BooksDataService from "../../services/BooksDataService";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksDataService.getAllBooks({ q: "action", maxResults: 10 }).then(
      (books) => {
        setBooks(books.items);
        setIsLoading(false);
      }
    );
  }, []);

  return <div>{isLoading ? <BookLoading /> : <Home book={books} />}</div>;
};

export default HomePage;
