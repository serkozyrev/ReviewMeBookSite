import { useState } from "react";

import ReviewDataServices from "../../services/ReviewDataServices";

import { Rating } from "@material-ui/lab";
import Report from "../Report/Report";

import Popup from "../style/Popup";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  const {
    loginUserId,
    reviewUserId,
    id,
    rating,
    nickname,
    date,
    review,
    index,
    itemId,
    onClickEdit,
    refreshReviews,
  } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const togglePopup = async () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleReportPopup = async (isSaved = false) => {
    if (isSaved) {
      setShowSuccess(true);
    }
    setIsReportPopupOpen(!isReportPopupOpen);
  };

  const onClickDelete = () => {
    ReviewDataServices.deleteReview(id).then((isDeleted) => {
      if (isDeleted) {
        refreshReviews();
      }
    });
    togglePopup();
  };

  const onClickEditReview = () => {
    onClickEdit(itemId);
  };

  const checkUserId = () => {
    if (loginUserId === reviewUserId) {
      return (
        <>
          <div className="col-lg-1 col-1">
            <button className="link" onClick={onClickEditReview}>
              Edit
            </button>
          </div>
          <div className="col-lg-1 col-1">
            <button className="link" onClick={togglePopup}>
              Delete
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div className="col-lg-1 col-1">
          <button className="link" onClick={() => toggleReportPopup(false)}>
            Report
          </button>
        </div>
      );
     
    }
  };

  const successDialog = () => {
    return (
      <Popup
        content={
          <>
            <h4>"Record saved Successfully."</h4>
            <button
              className="btn btnPopup"
              onClick={() => toggleReportPopup()}
            >
              Close
            </button>
          </>
        }
      />
    );
  };

  return (
    <div className="reviewItemContainer" key={index}>
      <Rating name="hover-feedback" value={rating} disabled={true} />
      <div className="row">
        <div className="col-lg-3 col-5">
          <h5 className="nickname">{nickname}</h5>
        </div>
        <div className="col-lg-2 col-4">
          <p className="date">{date}</p>
        </div>
        {checkUserId()}
      </div>

      <p>{review}</p>
      {isPopupOpen && (
        <Popup
          content={
            <>
              <h2>Delete Confirm</h2>
              <p className="popup-content">
                Do you want to delete this review?
              </p>
              <button className="btn btnPopup" onClick={() => onClickDelete()}>
                Yes
              </button>
              <button className="btn btnPopup" onClick={() => togglePopup()}>
                No
              </button>
            </>
          }
        />
      )}

      {isReportPopupOpen && (
        <Report
          userId={reviewUserId}
          reporterId={loginUserId}
          reviewId={id}
          nickname={nickname}
          rating={rating}
          reviewDate={date}
          comment={review}
          toggleReportPopup={toggleReportPopup}
        />
      )}

      {showSuccess && (
        <Popup
          content={
            <>
              <h4>"Record Saved Successfully."</h4>
              <button className="btnPopup" onClick={() => setShowSuccess(false)}>
                  Close
              </button>
            </>
          }
        />
      )}
    </div>
  );
};

export default ReviewItem;
