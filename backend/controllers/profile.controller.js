const db = require("../models");
const sequelize = db.sequelize;

module.exports.getAllProfiles = () => {
    return new Promise((resolve, reject) => {
        sequelize
            .query("SELECT * FROM userdetails ud INNER JOIN usr u ON ud.userid=u.userid AND isActive=true")
            .then((data) => {
                resolve({ errCode: 0, profile: data });
            })
            .catch((err) => {
                reject({ errCode: 1, message: "error while getting profile" });
            });
    });
};

module.exports.getProfileByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        sequelize
            .query(`SELECT * FROM userdetails ud INNER JOIN usr u ON ud.userid=u.userid WHERE ud.userid='${userId}' AND isActive=true`)
            .then((data) => {
                resolve({ errCode: 0, profile: data });
            })
            .catch((err) => {
                reject({ errCode: 1, message: "error while getting profile" });
            });
    });
};

module.exports.editProfile = (newData) => {
    return new Promise(async (resolve, reject) => {
        if (
            typeof newData.firstname === "undefined" ||
            typeof newData.lastname === "undefined" ||
            typeof newData.nickname === "undefined" ||
            typeof newData.userId === "undefined"
        ) {
            reject({ errCode: 1, message: "Edit profile failed - A field is missing" });
        } else {
            const results = await sequelize.query(
                `UPDATE userdetails SET firstname='${newData.firstname}',lastname='${newData.lastname}',nickname='${newData.nickname}' WHERE userid=${newData.userId} `
            );

            if (results[1].rowCount === 1) {
                resolve({ errCode: 0, message: "Edit profile successful" });
            } else {
                reject({ errCode: 1, message: "Edit profile failed" });
            }
        }
    })
}

module.exports.deleteAccountProfile = (userId) => {
    return new Promise(async (resolve, reject) => {
        if (
            typeof userId === "undefined"
        ) {
            reject({ errCode: 1, message: "Account deletion failed" });
        } else {
            const results = await sequelize.query(
                `UPDATE usr SET isactive=false WHERE userid=${userId}`
            );

            if (results[1].rowCount === 1) {
                resolve({ errCode: 0, message: "Account deletion successful" });
            } else {
                reject({ errCode: 1, message: "Account deletion failed" });
            }
        }
    })
}