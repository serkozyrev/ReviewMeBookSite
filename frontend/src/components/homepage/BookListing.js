import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./BookListing.css";
import BooksDataService from "../../services/BooksDataService";

const BookListing = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksDataService.getAllBooks({ q: "fiction", maxResults: 18 }).then(
      (books) => {
        setBooks(books.items);
      }
    );
  }, []);

  return (
    <div className="container">
      <div className="row">
        {books.map((post) => (
          <div key={post.id} className="col-md-2">
            <Link to={`/details/${post.id}`}>
              <img src={post.volumeInfo.imageLinks.thumbnail} alt="" />
            </Link>
            <Link to={`/details/${post.id}`} className="bookLink">
              <h4>{post.volumeInfo.title}</h4>
              <p className="author"> by {post.volumeInfo.authors}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListing;
