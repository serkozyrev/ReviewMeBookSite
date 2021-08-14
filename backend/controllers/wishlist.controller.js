const db = require("../models");
const sequelize = db.sequelize;

module.exports.getAllWishList = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query("SELECT * FROM wishlist")
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getWishListByUserId = (userid) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(`SELECT * FROM wishlist WHERE userid=${userid}`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.deleteWishlistById = (id, num) => {
  return new Promise(async (resolve, reject) => {
    const results = await sequelize.query(`DELETE FROM wishlist ${id}`);

    if (results[1].rowCount == num) {
      resolve({ errCode: 0, message: "Delete wishlist item success" });
    } else {
      reject({ errCode: 1, message: "Delete wishlist item fail" });
    }
  });
};

module.exports.AddWishlist = async (newItem) => {
  return new Promise(async (resolve, reject) => {
    const [wishlist, metadata] = await sequelize.query(
      `INSERT INTO wishlist(userid, booktitle, bookcover, bookid, author)  VALUES(${newItem.userId}, '${newItem.bookTitle}', '${newItem.bookcover}', '${newItem.bookId}', '${newItem.author}')`
    );

    if (metadata === 1) {
      resolve({ errCode: 0, message: "Add wishliist item success" });
    } else {
      reject({ errCode: 1, message: "Add wishlist item fail" });
    }
  });
};
