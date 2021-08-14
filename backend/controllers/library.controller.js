const db = require("../models");
const sequelize = db.sequelize;

module.exports.getAllLibraries = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query("SELECT * FROM libraryitem")
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getAllLibraryByUserId = (userid) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(`SELECT * FROM libraryitem WHERE userid=${userid}`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.deleteLibraryItemById = (id) => {
  return new Promise(async (resolve, reject) => {
    const [results, metadata] = await sequelize.query(
      `DELETE FROM libraryitem ${id}`
    );
    if (metadata.rowCount === 1) {
      resolve({ errCode: 0, message: "Delete library item success" });
    } else {
      reject({ errCode: 1, message: "Delete library item fail" });
    }
  });
};

module.exports.AddLibraryItem = async (newItem) => {
  return new Promise(async (resolve, reject) => {
    const [libraryItem, metadata] = await sequelize.query(
      `INSERT INTO libraryitem(userid, booktitle, bookcover, bookid, author)  VALUES(${newItem.userId}, '${newItem.bookTitle}', '${newItem.bookcover}', '${newItem.bookId}', '${newItem.author}')`
    );

    if (metadata === 1) {
      resolve({ errCode: 0, message: "Add Library item success" });
    } else {
      reject({ errCode: 1, message: "Add Library item fail" });
    }
  });
};
