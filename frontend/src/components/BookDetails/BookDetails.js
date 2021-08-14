import { useState, useMemo, useReducer } from "react";
import { Rating } from "@material-ui/lab";

import ReviewDataServices from "../../services/ReviewDataServices";

import Button from "./Button";
import ReviewItem from "./ReviewItem";
import EditReviewItem from "./EditReviewItem";
import Popup from "../style/Popup";
import Pagination from "../style/Pagination";
import "./BookDetails.css";

const PageSize = 8;

const BookDetails = (props) => {
  const {
    getWishlist,
    getLibrary,
    userType,
    userId,
    bookInfo,
    reviews,
    setReviewsHandler,
    refreshReviews,
    wishlist,
    library,
    bookCover,
  } = props;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const categories = bookInfo.volumeInfo.categories;

  const togglePopup = async () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const getAuthor = () => {
    const authors = bookInfo.volumeInfo.authors;
    let authorsArr = "";

    if (typeof authors !== "undefined") {
      authorsArr = authors[0];

      for (let i = 1; i < authors.length; i++) {
        authorsArr += `, ${authors[i]}`;
      }
    } else {
      authorsArr = "No Authors";
    }

    return authorsArr;
  };

  const addBookShelfInfo = {
    userId: userId,
    bookTitle: bookInfo.volumeInfo.title,
    bookcover: bookCover,
    bookId: bookInfo.id,
    author: getAuthor(),
  };

  const displayCategories = (categories) => {
    let categoryArr = "";
    if (typeof categories !== "undefined") {
      categoryArr = categories[0];
      for (let i = 1; i < categories.length; i++) {
        categoryArr += ", " + categories[i];
      }
    } else {
      categoryArr = "No Category";
    }

    return categoryArr;
  };

  const displayPulbisher = (publishers) => {
    let publisherArr = "";
    if (typeof publishers !== "undefined") {
      publisherArr = publishers;
    } else {
      publisherArr = "No Publiser";
    }

    return publisherArr;
  };

  const displayPublishDate = (date) => {
    let publishDate = "";
    if (typeof date !== "undefined") {
      publishDate = date;
    } else {
      publishDate = "No Publiser";
    }

    return publishDate;
  };

  const displayISBN = (ISBN) => {
    let isbn = "";
    if (typeof ISBN !== "undefined") {
      isbn = ISBN;
    } else {
      isbn = "No ISBN";
    }

    return isbn;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType !== 2) {
      setPopupTitle("Log In Validation");
      setPopupContent("Please log in before you add review");
      togglePopup();
    } else {
      if (comment === "" || rating === 0) {
        setPopupTitle("Add Review Validation");
        setPopupContent("Please select rating and write comment");
        togglePopup();
      } else {
        const newReview = {
          rating: rating,
          comment: comment,
          userId: userId,
          bookId: bookInfo.id,
        };
        ReviewDataServices.addReview(newReview).then((isAdded) => {
          setRating(0);
          setComment("");
          refreshReviews();
        });
      }
    }
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const onClickEdit = (id) => {
    let reviewsArr = reviews;
    reviewsArr[id].isEdit = !reviewsArr[id].isEdit;
    setReviewsHandler(reviewsArr);
    forceUpdate();
  };

  const showDescription = () => {
    let description = bookInfo.volumeInfo.description;

    if (typeof description === "undefined") {
      description = "No Description Available";
    } else {
      description = description.split(/<br>/).join("\n");
      description = description.replace(/<\/br>/gi, "");
      description = description.replace(/<\/i>/gi, "");
      description = description.replace(/<i>/gi, "");
      description = description.replace(/<b>/gi, "");
      description = description.replace(/<\/b>/gi, "");
      description = description.replace(/<p>/gi, "");
      description = description.replace(/<\/p>/gi, "");
    }

    return description;
  };

  const reviewData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return reviews.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, reviews]);

  return (
    <div className="container detailContainer">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-6">
          <h1>{bookInfo.volumeInfo.title}</h1>
          <p className="bookInfo">Author: {getAuthor()}</p>
          <p className="bookInfo">
            Published date:{" "}
            {displayPublishDate(bookInfo.volumeInfo.publishedDate)}
          </p>
          <p className="bookInfo">
            Publisher: {displayPulbisher(bookInfo.volumeInfo.publisher)}
          </p>
          <p className="bookInfo">
            Category:{" "}
            {typeof categories === "undefined"
              ? "No Categories"
              : displayCategories(categories)}
          </p>
          <p className="bookInfo">
            ISBN:{" "}
            {typeof bookInfo.volumeInfo.industryIdentifiers === "undefined"
              ? "No ISBN"
              : displayISBN(
                  bookInfo.volumeInfo.industryIdentifiers[0].identifier
                )}
          </p>
        </div>
        <div className="col-lg-4 col-5 imageContainer">
          <img
            className="bookImage"
            src={bookCover}
            alt={bookInfo.volumeInfo.title}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-9 col-11 ">
          <div className="buttonContainer">
            <Button
              addBookShelfInfo={addBookShelfInfo}
              getBookshelf={getWishlist}
              bookshelf={wishlist}
              name="Wish List"
              isMargin={true}
              isRedirect={false}
              setPopupContent={setPopupContent}
              setPopupTitle={setPopupTitle}
              togglePopup={togglePopup}
            />
            <Button
              addBookShelfInfo={addBookShelfInfo}
              getBookshelf={getLibrary}
              name="Library"
              bookshelf={library}
              isMargin={true}
              isRedirect={false}
              setPopupContent={setPopupContent}
              setPopupTitle={setPopupTitle}
              togglePopup={togglePopup}
            />
            <Button
              name="Rent / Borrow"
              isMargin={true}
              isRedirect={true}
              link={bookInfo.saleInfo.buyLink}
            />
            <Button
              name="Preview"
              isMargin={false}
              isRedirect={true}
              link={bookInfo.volumeInfo.previewLink}
            />
          </div>
          <div className="subContainer">
            <h3>Description</h3>
            <p className="desc">{showDescription()}</p>
          </div>
          <div className="subContainer">
            <h3>Reviews</h3>
            <form onSubmit={handleSubmit}>
              <Rating
                onClick={handleRatingChange}
                name="rating"
                value={rating}
                precision={1}
              />
              <textarea
                placeholder="You have a comment ? *"
                className="textarea"
                name="comment"
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <div className="commentBtn">
                <input type="submit" value="Submit" className="btn submit" />
              </div>
            </form>

            <div className="subContainer">
              {reviewData.map((data, index) => {
                if (data.isEdit) {
                  return (
                    <EditReviewItem
                      key={index}
                      reviewId={data.reviewid}
                      itemId={index}
                      rating={data.rating}
                      comment={data.comment}
                      onClickEdit={onClickEdit}
                      refreshReviews={refreshReviews}
                    />
                  );
                } else {
                  return (
                    <ReviewItem
                      key={index}
                      itemId={index}
                      loginUserId={userId}
                      reviewUserId={data.userid}
                      id={data.reviewid}
                      rating={data.rating}
                      nickname={data.nickname}
                      date={data.updatedate}
                      review={data.comment}
                      onClickEdit={onClickEdit}
                      refreshReviews={refreshReviews}
                    />
                  );
                }
              })}
              <div className="d-flex justify-content-center">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={reviews.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
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
  );
};

export default BookDetails;
