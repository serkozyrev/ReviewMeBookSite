const db = require("../models");
const sequelize = db.sequelize;

module.exports.getAllReviews = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query("SELECT * FROM review INNER JOIN usr ON review.userid=usr.userid")
      .then((data) => {
        resolve({ errCode: 0, reviews: data });
      })
      .catch((err) => {
        reject({ errCode: 1, message: "faile to get all reviews" });
      });
  });
};

module.exports.getReviewsByBookId = (bookId) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT * FROM review r INNER JOIN userdetails u ON r.userid=u.userid WHERE r.bookid='${bookId}' AND isActive=true ORDER BY updatedate DESC`
      )
      .then((data) => {
        resolve({ errCode: 0, reviews: data });
      })
      .catch((err) => {
        reject({ errCode: 1, message: "fail to get reviews by book id" });
      });
  });
};

module.exports.getReviewsByReviewId = (reviewId) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT * FROM review r INNER JOIN userdetails u ON r.userid=u.userid WHERE r.reviewid='${reviewId}' AND isActive=true`
      )
      .then((data) => {
        resolve({ errCode: 0, reviews: data });
      })
      .catch((err) => {
        reject({ errCode: 1, message: "Failed to get reviews by review id" });
      });
  });
};

module.exports.addReview = (newReview) => {
  return new Promise(async (resolve, reject) => {
    if (
      typeof newReview.date === "undefined" ||
      typeof newReview.comment === "undefined" ||
      typeof newReview.rating === "undefined" ||
      typeof newReview.userId === "undefined" ||
      typeof newReview.bookId === "undefined"
    ) {
      reject({ errCode: 1, message: "Add review fail" });
    } else {
      const [results, metadata] = await sequelize.query(
        `INSERT INTO review (createdate, updatedate, comment, rating, userid, bookid, isactive) VALUES(CAST('${newReview.date}' AS date), CAST('${newReview.date}' AS date), '${newReview.comment}', ${newReview.rating}, ${newReview.userId}, '${newReview.bookId}', true)`
      );

      if (metadata === 1) {
        resolve({ errCode: 0, message: "Add review success" });
      } else {
        reject({ errCode: 1, message: "Add review fail" });
      }
    }
  });
};

module.exports.deleteReview = (reviewId) => {
  return new Promise(async (resolve, reject) => {
    if (typeof reviewId === "undefined") {
      resolve({
        errCode: 1,
        message: "Delete review failed - at least one field is missing",
      });
    } else {
      const results = await sequelize.query(
        `UPDATE review SET isActive=false WHERE reviewid=${reviewId}`
      );

      if (results[1].rowCount === 1) {
        resolve({ errCode: 0, message: "Delete review success" });
      } else {
        reject({ errCode: 1, message: "Delete review fail" });
      }
    }
  });
};

module.exports.editReview = (editReview) => {
  return new Promise(async (resolve, reject) => {
    if (
      typeof editReview.date === "undefined" ||
      typeof editReview.comment === "undefined" ||
      typeof editReview.rating === "undefined" ||
      typeof editReview.reviewId === "undefined"
    ) {
      reject({
        errCode: 1,
        message: "Edit review fail - at least one field missing",
      });
    } else {
      const results = await sequelize.query(
        `UPDATE review SET comment='${editReview.comment}', rating=${editReview.rating}, updatedate= CAST('${editReview.date}' AS date) WHERE reviewid=${editReview.reviewId}`
      );

      if (results[1].rowCount === 1) {
        resolve({ errCode: 0, message: "edit review success" });
      } else {
        reject({ errCode: 1, message: "edit review fail" });
      }
    }
  });
};
