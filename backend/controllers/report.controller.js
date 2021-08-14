const db = require("../models");
const sequelize = db.sequelize;

module.exports.getAllReports = () => {
    return new Promise((resolve, reject) => {
        sequelize
            .query(`SELECT r.reportid,r.reviewid,r.reporttypeid,r.comment AS "reportComment",rw.comment AS "reviewComment",
            rt.reporttype,rd.firstname ||' '|| rd.lastname AS "reporterName",
            rwd.firstname ||' '|| rwd.lastname AS "reviewerName",
            rd.userid as "reporterId",
            rwd.userid as "reviewerId"
            FROM report r 
            INNER JOIN reporttype rt ON r.reporttypeid=rt.reporttypeid
            INNER JOIN userdetails rd ON rd.userid=r.userid 
            INNER JOIN review rw ON rw.reviewid=r.reviewid
            LEFT JOIN userdetails rwd ON rwd.userid=rw.userid
            WHERE r.isactive=true`)
            .then((data) => {
                resolve({ errCode: 0, reports: data });
            })
            .catch((err) => {
                reject({ errCode: 1, message: "Failed to get all reports" });
            });
    });
};

module.exports.getReportByReportId = (reportId) => {
    return new Promise((resolve, reject) => {
        sequelize
            .query(
                `SELECT * FROM report r INNER JOIN reporttype rt ON r.reporttypeid=rt.reporttypeid WHERE r.reportid=${reportId} AND isActive=true`
            )
            .then((data) => {
                resolve({ errCode: 0, reports: data });
            })
            .catch((err) => {
                reject({ errCode: 1, message: "Failed to get report by report id" });
            });
    });
};

module.exports.getReportByReviewId = (reviewId) => {
    return new Promise((resolve, reject) => {
        sequelize
            .query(
                `SELECT * FROM report WHERE reviewid=${reviewId} AND isActive=true`
            )
            .then((data) => {
                resolve({ errCode: 0, reports: data });
            })
            .catch((err) => {
                reject({ errCode: 1, message: "Failed to get report by review id" });
            });
    });
};

module.exports.addReport = (newReport) => {
    return new Promise(async (resolve, reject) => {
        if (
            typeof newReport.userId === "undefined" ||
            typeof newReport.reviewId === "undefined" ||
            typeof newReport.date === "undefined" ||
            typeof newReport.reporttypeId === "undefined"
        ) {
            reject({ errCode: 1, message: "Add report failed" });
        } else {
            const [results, metadata] = await sequelize.query(
                `INSERT INTO report (userid, reviewid, createdate, updatedate, comment, reporttypeid, isactive) 
                VALUES('${newReport.userId}', '${newReport.reviewId}', CAST('${newReport.date}' AS date), CAST('${newReport.date}' AS date), '${newReport.comment}', '${newReport.reporttypeId}', true)`
            );

            if (metadata === 1) {
                resolve({ errCode: 0, message: "Add report successful" });
            } else {
                reject({ errCode: 1, message: "Add report failed" });
            }
        }
    });
};

module.exports.deleteReport = (reportId, reviewId) => {
    return new Promise(async (resolve, reject) => {
        if (typeof reportId === "undefined"
            || typeof reviewId === "undefined") {
            resolve({
                errCode: 1,
                message: "Delete report failed",
            });
        } else {
            const results = await sequelize.query(
                `WITH rp AS (
                    UPDATE report 
                    SET isactive = false
                    WHERE reportid=${reportId}
                    RETURNING *
                    )
            UPDATE review rw
            SET isactive = false
            FROM rp
            WHERE rw.reviewid=${reviewId}`
            );

            if (results[1].rowCount === 1) {
                resolve({ errCode: 0, message: "Delete report successful" });
            } else {
                reject({ errCode: 1, message: "Delete report failed" });
            }
        }
    });
};

module.exports.keepReport = (reportId) => {
    return new Promise(async (resolve, reject) => {
        if (typeof reportId === "undefined") {
            resolve({
                errCode: 1,
                message: "Keep report failed",
            });
        } else {
            const results = await sequelize.query(`UPDATE report SET isactive = false WHERE reportid = ${reportId}`
            );

            if (results[1].rowCount === 1) {
                resolve({ errCode: 0, message: "Keep report successful" });
            } else {
                reject({ errCode: 1, message: "Keep report failed" });
            }
        }
    });
};

