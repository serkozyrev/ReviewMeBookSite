/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
    getAllReports() {
        return axios.get(`/reports`).then((res) => {
            if (res.data.errCode === 0) {
                return res.data.reports[0];
            } else {
                console.log(res.data);
            }
        });
    },
    getReportByReportId(reportId) {
        return axios.get(`/reports/${reportId}`).then((res) => {
            if (res.data.errCode === 0) {
                return res.data.reports[0];
            } else {
                console.log(res.data);
            }
        });
    },
    getReportByReviewId(reviewId) {
        return axios.get(`/report/${reviewId}`).then((res) => {
            if (res.data.errCode === 0) {
                return res.data.reports[0];
            } else {
                console.log(res.data);
            }
        });
    },
    addReport(newReport) {
        return axios.post(`/reports/add`, newReport).then((res) => {
            if (res.data.errCode === 0) {
                return true;
            } else {
                return false;
            }
        });
    },
    deleteReport(reportId, reviewId) {
        return axios.post(`/reports/delete`, { reportId: reportId, reviewId: reviewId }).then((res) => {
            if (res.data.errCode === 0) {
                return true;
            } else {
                return false;
            }
        });
    },
    keepReport(reportId) {
        return axios.post(`/reports/keep`, { reportId: reportId }).then((res) => {

            if (res.data.errCode === 0) {
                return true;
            } else {
                return false;
            }
        });
    }
};