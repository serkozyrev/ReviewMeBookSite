import { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Title from "../style/Title";
import ReportedReview from "./ReportedReview";
import "./Report.css";
import ReportDataService from "../../services/ReportDataService";

const Report = (props) => {
  const options = ["Spoilers", "Hate Speech"];
  const [reportType, setReportType] = useState("Spoiler");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = {
      reporttypeId: reportType === "Spoiler" ? 1 : 2,
      comment: comment,
      userId: props.reporterId,
      date: new Date(),
      reviewId: props.reviewId,
    };
    ReportDataService.addReport(reportData).then((data) => {
      props.toggleReportPopup(true);
    });
  };

  const handleDropdownChange = (target) => {
    setReportType(target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="popup-box1">
      <div className="box1">
        <div className="container reportContainer">
          <div className="row justify-content-center">
            <div className="col-lg-9 col-11">
              <Title name="Report Review" />
              <ReportedReview
                nickname={props.nickname} //{reviewInfo.nickname}
                date={props.reviewDate} //{reviewInfo.date}
                rating={props.rating} //{reviewInfo.rating}
                comment={props.comment} //{reviewInfo.comment}
              />
              <form onSubmit={handleSubmit}>
                <div className="subContainer">
                  <div className="questionContainer">
                    Why are you reporting this comment?
                  </div>
                  <Dropdown
                    name="reportType"
                    className="dropdown"
                    onChange={handleDropdownChange}
                    options={options}
                    value={reportType}
                    placeholder="Select an option"
                  />
                </div>
                <div className="subContainer">
                  <div className="questionContainer">
                    Tell us more (Optional)
                  </div>
                  <textarea
                    name="comment"
                    value={comment}
                    placeholder="You have a comment ? *"
                    className="textarea"
                    onChange={handleCommentChange}
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-sm-6 text-center">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn report"
                      onClick={() => handleSubmit}
                    />
                  </div>
                  <div className="col-sm-6 text-center">
                    <input
                      type="Cancel"
                      value="Cancel"
                      className="btn report"
                      onClick={() => props.toggleReportPopup()}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
