const ReviewsController = require("../backend/controllers/review.controller");

test("Test get all reviews controller", () => {
  return ReviewsController.getAllReviews()
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((res) => {
      expect(res.errCode).toBe(0);
    });
});

test("Test get reviews by book id controller with correct book ID", () => {
  return ReviewsController.getReviewsByBookId("UwYJsklz7WkC")
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((res) => {
      expect(res.errCode).toBe(0);
    });
});

test("Test get reviews by book id controller with empty string", () => {
  return ReviewsController.getReviewsByBookId("")
    .then((res) => {
      expect(res.reviews).toBe(undefined);
    })
    .catch((res) => {
      expect(res.reviews).toBe(undefined);
    });
});

test("Test get reviews by book id controller with wrong book ID", () => {
  return ReviewsController.getReviewsByBookId("Wrong Book ID")
    .then((res) => {
      expect(res.reviews).toBe(undefined);
    })
    .catch((res) => {
      expect(res.reviews).toBe(undefined);
    });
});

test("Test add review controller", () => {
  return ReviewsController.addReview({
    date: "1111-11-11",
    comment: "test add review",
    rating: 0,
    userId: 1,
    bookId: "",
  })
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((res) => {
      expect(res.errCode).toBe(0);
    });
});

test("Test add review controller without createdate", () => {
  return ReviewsController.addReview({
    comment: "test add review",
    rating: 0,
    userId: 0,
    bookId: "",
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test add review controller without comment", () => {
  return ReviewsController.addReview({
    date: "1111-11-11",
    rating: 0,
    userId: 1,
    bookId: "",
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test add review controller without rating", () => {
  return ReviewsController.addReview({
    date: "1111-11-11",
    comment: "test add review",
    userId: 1,
    bookId: "",
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test add review controller without userid", () => {
  return ReviewsController.addReview({
    date: "1111-11-11",
    comment: "test add review",
    rating: 0,
    bookId: "",
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test add review controller without bookId", () => {
  return ReviewsController.addReview({
    date: "1111-11-11",
    comment: "test add review",
    rating: 0,
    userId: 1,
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test edit review controller", () => {
  return ReviewsController.editReview({
    date: "1111-11-11",
    comment: "test edit review",
    rating: 1,
    reviewId: 501,
  })
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((res) => {
      expect(res.errCode).toBe(0);
    });
});

test("Test edit review controller without date", () => {
  return ReviewsController.editReview({
    comment: "test edit review",
    rating: 1,
    reviewId: 501,
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test edit review controller without comment", () => {
  return ReviewsController.editReview({
    date: "1111-11-11",
    rating: 1,
    reviewId: 501,
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test edit review controller without rating", () => {
  return ReviewsController.editReview({
    date: "1111-11-11",
    comment: "test edit review",
    reviewId: 501,
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test edit review controller without reviewId", () => {
  return ReviewsController.editReview({
    date: "1111-11-11",
    comment: "test edit review",
    rating: 1,
  })
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((res) => {
      expect(res.errCode).toBe(1);
    });
});

test("Test delete review controller", () => {
  return ReviewsController.deleteReview(1)
    .then((res) => {
      expect(res.errCode).toBe(0);
    })
    .catch((err) => {
      expect(err.errCode).toBe(0);
    });
});

test("Test delete review controller with wrong reviewId", () => {
  return ReviewsController.deleteReview(0)
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((err) => {
      expect(err.errCode).toBe(1);
    });
});

test("Test delete review controller with empty reviewId", () => {
  return ReviewsController.deleteReview()
    .then((res) => {
      expect(res.errCode).toBe(1);
    })
    .catch((err) => {
      expect(err.errCode).toBe(1);
    });
});
