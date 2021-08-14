/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AnnouncementOutlinedIcon from "@material-ui/icons/AnnouncementOutlined";
import SpeakerNotesOffOutlinedIcon from "@material-ui/icons/SpeakerNotesOffOutlined";
import MessageIcon from "@material-ui/icons/Message";

import ReportDataService from "../../services/ReportDataService";
import ReportComment from "./ReportComment";
import Title from "../style/Title";
import Pagination from "../style/Pagination";

import "./ReportManager.css";

let PageSize = 8;

const ReportManager = () => {
  const [allReports, setAllReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    ReportDataService.getAllReports().then((reportData) => {
      setAllReports(reportData);
      setFilteredReports(reportData);
    });
  }, []);

  const filterFunction = (reportType) => {
    if (reportType === "All") {
      setFilteredReports(allReports);
    } else {
      const dummyData = allReports.filter((item) => {
        return item.reporttype === reportType;
      });
      setFilteredReports(dummyData);
    }
  };

  const onDelete = (reviewId, reportId) => {
    ReportDataService.deleteReport(reportId, reviewId).then((data) => {
      if (data === true) {
        ReportDataService.getAllReports().then((reportData) => {
          setAllReports(reportData);
          setFilteredReports(reportData);
        });
      }
    });
  };

  const onKeep = (reportId) => {
    ReportDataService.keepReport(reportId).then((data) => {
      if (data === true) {
        ReportDataService.getAllReports().then((reportData) => {
          setAllReports(reportData);
          setFilteredReports(reportData);
        });
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const filteredReportsData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredReports.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredReports]);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          id="side-navigation"
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item mt-2">
                <Link
                  to="report-admin"
                  className="nav-link align-middle px-0"
                  onClick={() => filterFunction("All")}
                >
                  <MessageIcon />
                  <span className="ms-1 d-none d-sm-inline">All</span>
                </Link>
              </li>
              <li className="nav-item mt-2">
                <a
                  href="#spoiler"
                  className="nav-link align-middle px-0"
                  onClick={() => filterFunction("Spoilers")}
                >
                  <AnnouncementOutlinedIcon />
                  <span className="ms-1 d-none d-sm-inline">Spoiler</span>
                </a>
              </li>
              <li className="nav-item mt-2">
                <a
                  href="#hateSpeech"
                  className="nav-link px-0 align-middle"
                  onClick={() => filterFunction("Hate Speech")}
                >
                  <SpeakerNotesOffOutlinedIcon />
                  <span className="ms-1 d-none d-sm-inline">Hate Speech</span>
                </a>
              </li>
            </ul>
            <hr />
          </div>
        </div>
        <div className="col py-3">
          <div className="text-center mt-3">
            <Title name="Reports" />
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="cards">
                {filteredReportsData.map((data, index) => (
                  <ReportComment
                    key={index.toString()}
                    reporterName={data.reporterName}
                    reporterComment={data.reportComment}
                    reviewerName={data.reviewerName}
                    reviewerComment={data.reviewComment}
                    reviewId={data.reviewid}
                    reportId={data.reportid}
                    onDelete={onDelete}
                    onKeep={onKeep}
                  />
                ))}
              </div>

              <div className="d-flex justify-content-center">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={filteredReports.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManager;
