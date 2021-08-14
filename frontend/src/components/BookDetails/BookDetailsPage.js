import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BooksDataService from "../../services/BooksDataService";
import ReviewDataServices from "../../services/ReviewDataServices";
import LibraryDataServices from "../../services/LibraryDataServices";
import WishListDataServices from "../../services/WishListDataServices";

import BookDetails from "./BookDetails";
import BookLoading from "../style/BookLoading";

const BookDetailsPage = (props) => {
  const { userType, userId } = props;
  const { id } = useParams();
  const [book, setBook] = useState();
  const [bookCover, setBookCover] = useState("");
  const [library, setLibrary] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    BooksDataService.getBooksByID(id).then((book) => {
      setBook(book);

      const bookCoverImage =
        typeof book.volumeInfo.imageLinks === "undefined"
          ? `${process.env.PUBLIC_URL}/images/no_image.jpg`
          : book.volumeInfo.imageLinks.thumbnail;
      setBookCover(bookCoverImage);

      if (userType === 2) {
        getWishlist();
        getLibrary();
      }

      refreshReviews();
    });
  }, []);

  const getWishlist = () => {
    WishListDataServices.getWishListByUseId(localStorage.getItem("user")).then(
      (wishlist) => {
        setWishlist(wishlist);
      }
    );
  };

  const getLibrary = () => {
    LibraryDataServices.getLibraryByUseId(localStorage.getItem("user")).then(
      (library) => {
        setLibrary(library);
      }
    );
  };

  const setReviewsHandler = (reviewsArr) => {
    setReviews(reviewsArr);
  };

  const refreshReviews = () => {
    ReviewDataServices.getReviewsByBookId(id).then((reviewsArr) => {
      for (let i = 0; i < reviewsArr.length; i++) {
        reviewsArr[i].isEdit = false;
      }

      setReviews(reviewsArr);
      setIsLoading(false);
    });
  };

  return (
    <div>
      {isLoading ? (
        <BookLoading />
      ) : (
        <BookDetails
          bookCover={bookCover}
          getWishlist={getWishlist}
          getLibrary={getLibrary}
          wishlist={wishlist}
          library={library}
          userType={userType}
          userId={userId}
          bookInfo={book}
          reviews={reviews}
          refreshReviews={refreshReviews}
          setReviewsHandler={setReviewsHandler}
        />
      )}
    </div>
  );
};

export default BookDetailsPage;
