/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  getReviewsByBookId(bookId) {
    return axios.get(`/reviews/${bookId}`).then((res) => {
      if (res.data.errCode === 0) {
        return res.data.reviews[0];
      } else {
        console.log(res.data);
      }
    });
  },
  getReviewsByReviewId(reviewId) {
    return axios.get(`/review/${reviewId}`).then((res) => {
      if (res.data.errCode === 0) {
        return res.data.reviews[0];
      } else {
        console.log(res.data);
      }
    });
  },
  addReview(newReview) {
    return axios.post(`/reviews/add`, newReview).then((res) => {
      if (res.data.errCode === 0) {
        return true;
      } else {
        return false;
      }
    });
  },
  deleteReview(reviewId) {
    return axios.put(`/reviews/delete`, { reviewId: reviewId }).then((res) => {
      if (res.data.errCode === 0) {
        return true;
      } else {
        return false;
      }
    });
  },
  editReview(editReview) {
    return axios.put(`/reviews/edit`, editReview).then((res) => {
      if (res.data.errCode === 0) {
        return true;
      } else {
        return false;
      }
    });
  },
};