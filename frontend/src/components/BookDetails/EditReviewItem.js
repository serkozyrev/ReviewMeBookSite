import { useState } from "react";
import { Rating } from "@material-ui/lab";

import ReviewDataServices from "../../services/ReviewDataServices";

const EditReviewItem = (props) => {
  const [rating, setRating] = useState(props.rating);
  const [comment, setComment] = useState(props.comment);
  const { reviewId, itemId, onClickEdit, refreshReviews } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const editReview = {
      rating: rating,
      comment: comment,
      reviewId: reviewId,
    };

    ReviewDataServices.editReview(editReview).then((result) => {
      if (result) {
        refreshReviews();
      }
    });

    onClickEdit(itemId);
  };

  const handleChangeRating = (value) => {
    setRating(parseInt(value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const onClickCancel = () => {
    onClickEdit(itemId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Rating
        name="hover-feedback"
        value={rating}
        prevision={0.5}
        onChange={(event, newValue) => {
          handleChangeRating(newValue);
        }}
      />
      <textarea
        placeholder="You have a comment ? *"
        className="textarea"
        name="comment"
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <div className="row justify-content-end">
        <div className="col col-lg-8 commentBtn">
          <input type="submit" value="Save Edit" className="btn submit" />
        </div>
        <div className="col col-lg commentBtn">
          <button className="btn submit" onClick={onClickCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditReviewItem;
