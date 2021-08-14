const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const db = require("./models");
const sequelize = db.sequelize;
const controllers = require("./controllers");
const { userInfo } = require("os");
const controller = require("./controllers");
const jwtGenerator = require("./utils/jwtGenerator");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//#region User
app.put("/reset-pass", (req, res) => {
  const { tokenInfo, password, currentPass } = req.body;

  const userInfo = {
    tokenInfo: tokenInfo,
    password: password,
    currentPassword: currentPass,
  };
  controllers.users.resetPassword(userInfo).then((data) => {
    res.json(data);
  });
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    controllers.users.login(email).then(async (data) => {
      if (typeof data === "string") {
        res.json(data);
      } else {
        let user_id;
        data[0].map((dataDetails) => {
          user_id = dataDetails.userid;
        });
        let password1;
        data[0].map((dataDetails) => {
          password1 = dataDetails.password;
        });
        const userDetailInfo = await sequelize.query(
          `SELECT * from userdetails where userid='${user_id}'`
        );
        const validPassword = await bcrypt.compare(password, password1);
        const token = jwtGenerator(user_id);
        res.json({
          tokenInfo: token,
          users: data,
          password: validPassword,
          details: userDetailInfo[0],
        });
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/auth/signup", async (req, res) => {
  const {
    nickName,
    email,
    password,
    password2,
    firstName,
    lastName,
    gender,
    dob,
  } = req.body;

  const userInfo = {
    nickName: nickName,
    email: email,
    password: password,
    password2: password2,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    dob: dob,
    userType: 2,
  };

  controllers.users
    .login(req)
    .then((data) => {})
    .catch((err) => {
      res.status(401).json();
    });

  controllers.users.signup(userInfo).then((result) => {
    res.json(result);
  });
});

app.post("/auth/signupadmin", async (req, res) => {
  const {
    nickName,
    email,
    password,
    password2,
    firstName,
    lastName,
    gender,
    dob,
  } = req.body;

  const userInfo = {
    nickName: nickName,
    email: email,
    password: password,
    password2: password2,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    dob: dob,
    userType: 1,
  };

  controllers.users
    .login(req)
    .then((data) => {})
    .catch((err) => {
      res.status(401).json();
    });

  controllers.users.signup(userInfo).then((result) => {
    res.json(result);
  });
});
//#endregion

//#region Reviews
app.get("/reviews", (req, res) => {
  controllers.review
    .getAllReviews()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/reviews/:bookId", (req, res) => {
  const bookId = req.params.bookId;

  controllers.review
    .getReviewsByBookId(bookId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/review/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;

  controllers.review
    .getReviewsByReviewId(reviewId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/reviews/add", (req, res) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  const newReview = {
    date: `${year}-${month}-${day}`,
    comment: req.body.comment,
    rating: req.body.rating,
    userId: req.body.userId,
    bookId: req.body.bookId,
  };

  controllers.review
    .addReview(newReview)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/reviews/edit", (req, res) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  const editReview = {
    date: `${year}-${month}-${day}`,
    comment: req.body.comment,
    rating: req.body.rating,
    reviewId: req.body.reviewId,
  };

  controllers.review
    .editReview(editReview)
    .then((result) => {
      res.json({ errCode: 0, message: "Edit review success" });
    })
    .catch((err) => {
      res.json({ errCode: 1, message: "Edit review fail" });
    });
});

app.put("/reviews/delete", (req, res) => {
  const reviewId = req.body.reviewId;
  controllers.review
    .deleteReview(reviewId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//#endregion

//#region Report
app.get("/reports", (req, res) => {
  controllers.report
    .getAllReports()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/reports/:reportId", (req, res) => {
  const reportId = req.params.reportId;
  controllers.report
    .getReportByReportId(reportId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/report/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;
  controllers.report
    .getReportByReviewId(reviewId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/reports/add", (req, res) => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  const newReport = {
    date: `${year}-${month}-${day}`,
    userId: req.body.userId,
    reviewId: req.body.reviewId,
    comment: req.body.comment,
    reporttypeId: req.body.reporttypeId,
  };

  controllers.report
    .addReport(newReport)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/reports/delete", (req, res) => {
  const reportId = req.body.reportId;
  const reviewId = req.body.reviewId;
  controllers.report
    .deleteReport(reportId, reviewId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/reports/keep", (req, res) => {
  const reportId = req.body.reportId;
  controllers.report
    .keepReport(reportId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//#endregion

//#region Library
app.get("/library-item", (req, res) => {
  controllers.library
    .getAllLibraries()
    .then((data) => {
      res.json({ errCode: 0, libraries: data });
    })
    .catch((err) => {
      res.json({ errCode: 1, message: "error while getting library" });
    });
});

app.get("/library-item/:userId", (req, res) => {
  const userId = req.params.userId;
  controllers.library
    .getAllLibraryByUserId(userId)
    .then((data) => {
      res.json({ errCode: 0, libraries: data });
    })
    .catch((err) => {
      res.json({ errCode: 1, message: "error while getting library" });
    });
});

app.post("/library-item/add", (req, res) => {
  let bookTitle = req.body.bookTitle.replace("'", "''");
  let author = req.body.author.replace("'", "''");

  const newItem = {
    userId: req.body.userId,
    bookTitle: bookTitle,
    bookcover: req.body.bookcover,
    bookId: req.body.bookId,
    author: author,
  };

  controllers.library
    .AddLibraryItem(newItem)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/library-item/delete", (req, res) => {
  res.json({ errcode: 1, message: "No items selected" });
});

app.delete("/library-item/delete/:id", (req, res) => {
  const id = req.params.id;
  const idArr = id.split(",");

  let condition = `WHERE libraryitemid IN (${idArr[0]}`;
  for (let i = 1; i < idArr.length; i++) {
    condition += `,${idArr[i]}`;
  }
  condition += ")";
  controllers.library
    .deleteLibraryItemById(condition)
    .then((res) => {
      res.json({ errCode: 0, message: res });
    })
    .catch((err) => {
      res.json({ errCode: 1, message: err });
    });
});
//#endregion

//#region Wish List
app.get("/wishlist-item", (req, res) => {
  controllers.wishlist
    .getAllWishList()
    .then((data) => {
      res.json({ errCode: 0, wishlist: data });
    })
    .catch((err) => {
      res.json({ errCode: 1, message: "error while getting wishlist" });
    });
});

app.get("/wishlist-item/:userId", (req, res) => {
  const userId = req.params.userId;
  controllers.wishlist
    .getWishListByUserId(userId)
    .then((data) => {
      res.json({ errCode: 0, wishlist: data });
    })
    .catch((err) => {
      res.json({ errCode: 1, message: "error while getting wishlist" });
    });
});

app.post("/wishlist-item/add", (req, res) => {
  let bookTitle = req.body.bookTitle.replace("'", "''");
  let author = req.body.author.replace("'", "''");

  const newItem = {
    userId: req.body.userId,
    bookTitle: bookTitle,
    bookcover: req.body.bookcover,
    bookId: req.body.bookId,
    author: author,
  };

  controllers.wishlist
    .AddWishlist(newItem)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/wishlist-item/delete", (req, res) => {
  res.json({ errcode: 1, message: "No items selected" });
});

app.delete("/wishlist-item/delete", (req, res) => {
  const id = req.body.wishlistId;

  controllers.wishlist
    .deleteWishListById(id)
    .then((res) => {
      res.json({ errCode: 0, message: res });
    })
    .catch((err) => {
      res.json({ errCode: 1, message: err });
    });
});

app.delete("/wishlist-item/delete/:id", (req, res) => {
  const id = req.params.id;
  const idArr = id.split(",");

  let condition = `WHERE wishlistid IN (${idArr[0]}`;
  for (let i = 1; i < idArr.length; i++) {
    condition += `,${idArr[i]}`;
  }
  condition += ")";

  controllers.wishlist
    .deleteWishlistById(condition, idArr.length)
    .then((res) => {
      res.json(res);
    })
    .catch((err) => {
      res.json(err);
    });
});
//#endregion

//#region Profile
app.get("/user-profile", (req, res) => {
  controllers.profile
    .getAllProfiles()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/user-profile/:userId", (req, res) => {
  const userId = req.params.userId;
  controllers.profile
    .getProfileByUserId(userId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/user-profile/edit", (req, res) => {
  const newData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nickname: req.body.nickname,
    userId: req.body.userId,
  };
  controllers.profile
    .editProfile(newData)
    .then((result) => {
      res.json({ errCode: 0, message: "Edit Profile successful" });
    })
    .catch((err) => {
      res.json({ errCode: 1, message: "Edit Profile failed" });
    });
});

app.put("/user-profile/delete", (req, res) => {
  const userId = req.body.userId;
  controllers.profile
    .deleteAccountProfile(userId)
    .then((res) => {
      res.json(res);
    })
    .catch((err) => {
      res.json(err);
    });
});
//#endregion

//#region Books

app.get("/home", (req, res) => {
  res.json({ errcode: 0, message: "No items selected", books: { items: [] } });
});

app.get("/home/:name&:max", (req, res) => {
  const { name, max } = req.params;

  controllers.books
    .getAllBooks(name, max)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/home/:name", (req, res) => {
  const { name } = req.params;

  controllers.books
    .getBooksBySearch(name)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/book-details/:id", (req, res) => {
  const id = req.params.id;
  controllers.books
    .getBooksByID(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

//#endregion
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

db.initialize()
  .then((res) => {
    console.log(res);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
