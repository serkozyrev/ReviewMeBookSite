import React, { useState, useMemo, useEffect } from "react";

import BookListing from "./BookListing";
import SliderImage from "./SliderImage";
import SearchResult from "./SearchResult";
import Pagination from "../style/Pagination";
import Popup from "../style/Popup";

import BooksDataService from "../../services/BooksDataService";

import "./HomePage.css";

let PageSize = 8;

const Home = (props) => {
  const { book } = props;
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [year, setYear] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedBook, setSelectedBook] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");

  const togglePopup = async () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (bookName === "") {
      setPopupTitle("Please Check the following");
      setPopupContent(
        "Book Title is a required field. Please enter the book name"
      );
      togglePopup();
    } else {
      setSearching(true);

      let filtered = [];
      filtered = selectedBook.filter((book) => {
        const title = book.volumeInfo.title.toLowerCase();
        return title.includes(bookName.toLowerCase()) === true;
      });

      if (year !== "") {
        let yearFiltered = [];
        filtered.map((book) => {
          if (typeof book.volumeInfo.publishedDate !== "undefined") {
            let bookPublish = book.volumeInfo.publishedDate.split("-");
            bookPublish = bookPublish[0];

            if (Number(bookPublish) === Number(year)) {
              yearFiltered.push(book);
            }
          }
        });

        filtered = yearFiltered;
      }

      if (authorName !== "") {
        let authFiltered = [];
        filtered.map((book) => {
          if (typeof book.volumeInfo.authors !== "undefined") {
            const authors = book.volumeInfo.authors;
            for (let i = 0; i < authors.length; i++) {
              if (authors[i].toLowerCase().includes(authorName.toLowerCase())) {
                authFiltered.push(book);
                i = authors.length;
              }
            }
          }
        });

        filtered = authFiltered;
      }

      if (selectedCategory !== "") {
        let catFiltered = [];
        filtered.map((book) => {
          if (typeof book.volumeInfo.categories !== "undefined") {
            const categories = book.volumeInfo.categories;
            for (let i = 0; i < categories.length; i++) {
              if (
                categories[i]
                  .toLowerCase()
                  .includes(selectedCategory.toLocaleLowerCase())
              ) {
                catFiltered.push(book);
                i = categories.length;
              }
            }
          }
        });
        filtered = catFiltered;
      }

      if (selectedRating !== "") {
        let ratingFilter = [];
        if (selectedRating === "rating_hi_low") {
          filtered.map((book) => {
            if (typeof book.volumeInfo.averageRating !== "undefined") {
              const rating = book.volumeInfo.averageRating;
              if (rating >= 3.5) {
                ratingFilter.push(book);
              }
            }
          });
          filtered = ratingFilter;
        } else if (selectedRating === "rating_low_hi") {
          filtered.map((book) => {
            if (typeof book.volumeInfo.averageRating !== "undefined") {
              const rating = book.volumeInfo.averageRating;
              if (rating < 3.5) {
                ratingFilter.push(book);
              }
            }
          });
          filtered = ratingFilter;
        }
      }
      setSelectedBook(filtered);
    }
  };

  const onChangeBookNameHandler = (name) => {
    setBookName(name.target.value);
  };

  const onChangeAuthorNameHandler = (author) => {
    setAuthorName(author.target.value);
  };

  const onChangeYearHandler = (year) => {
    setYear(year.target.value);
  };

  const filterCategoryHandler = (filtered) => {
    setSelectedCategory(filtered.target.value);
  };

  const filterRatingHandler = (rating) => {
    setSelectedRating(rating.target.value);
  };

  const onClearHandler = () => {
    setBookName("");
    setAuthorName("");
    setYear("");
    setSelectedCategory("");
    setSelectedRating("");
  };

  const bookData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return selectedBook.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, selectedBook]);

  useEffect(() => {
    BooksDataService.getBooksBySearch({
      q: bookName,
    }).then((books) => {
      setSelectedBook(books.items);
    });
  }, [bookName]);

  return (
    <>
      <div className="container">
        <div className="my-5">
          <div
            className={`my-5 px-2 py-2 ${
              searching ? "searchResult" : "searchBar"
            }`}
          >
            <h5 className="mx-2 my-2">Search your Favorite Books</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="row mt-2">
                <div className="col">
                  <input
                    type="text"
                    name="bookName"
                    placeholder="Title"
                    className="form-control"
                    value={bookName}
                    onChange={onChangeBookNameHandler}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    className="form-control"
                    value={authorName}
                    onChange={onChangeAuthorNameHandler}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="year"
                    placeholder="Year"
                    className="form-control"
                    value={year}
                    onChange={onChangeYearHandler}
                  />
                </div>
              </div>
              {searching && (
                <div className="row mt-2">
                  <div className="col">
                    <div className="category-selector">
                      <div className="category-selector__control">
                        <select
                          className="form-select"
                          value={selectedCategory}
                          onChange={filterCategoryHandler}
                          placeholder="Choose an option"
                        >
                          <option defaultValue>Category</option>
                          <option value="history">History</option>
                          <option value="art">Art</option>
                          <option value="comics & graphic novels">
                            Comic Book
                          </option>
                          <option value="horror films">Horror</option>
                          <option value="music">Music</option>
                          <option value="fantasy">Fantasy</option>
                          <option value="fiction">Fiction</option>
                          <option value="young adult fiction">
                            Young Adult Fiction
                          </option>
                          <option value="cooking">Cooking</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="sorting-selector">
                      <div className="sorting-selector__control">
                        <select
                          name="sorting"
                          className="form-select"
                          value={selectedRating}
                          onChange={filterRatingHandler}
                        >
                          <option defaultValue>Rating</option>
                          <option value="rating_hi_low">
                            Rating: High to Low
                          </option>
                          <option value="rating_low_hi">
                            Rating: Low to High
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mt-3 mb-3">
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn search">
                      Search
                    </button>
                  </div>
                  <div className="col">
                    <button
                      type="reset"
                      onClick={onClearHandler}
                      className="btn reset"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {!searching && (
            <div
              className="blur-banner"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/book.jpg)`,
              }}
            ></div>
          )}
        </div>

        <div>
          {!searching && (
            <div className="mt-4">
              <SliderImage className="mb-2" book={book} />
            </div>
          )}
          {!searching && (
            <div className="text-center mb-4">
              <h4 className="my-5">Recommendation of the Week</h4>
              <div className="mb-5">
                <BookListing />
              </div>
            </div>
          )}
          {searching && (
            <div className="mt-5 mb-5">
              {bookData.map((book, index) => (
                <SearchResult
                  key={index}
                  image={
                    typeof book.volumeInfo.imageLinks === "undefined"
                      ? `${process.env.PUBLIC_URL}/images/no_image.jpg`
                      : book.volumeInfo.imageLinks.thumbnail
                  }
                  rating={book.volumeInfo.averageRating}
                  title={book.volumeInfo.title}
                  author={book.volumeInfo.authors}
                  date={book.volumeInfo.publishedDate}
                  category={book.volumeInfo.categories}
                  id={book.id}
                  description={book.volumeInfo.description}
                />
              ))}
              <div className="d-flex justify-content-center">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={selectedBook.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          )}
        </div>
        {isPopupOpen && (
          <Popup
            content={
              <>
                <h2>{popupTitle}</h2>
                <p className="popup-content">{popupContent}</p>
                <button className="btn btnPopup" onClick={() => togglePopup()}>
                  Close
                </button>
              </>
            }
          />
        )}
      </div>
    </>
  );
};

export default Home;
