import React from "react";

const ReportComment = (props) => {
  const {
    reporterName,
    reporterComment,
    reviewerName,
    reviewerComment,
    reviewId,
    reportId,
  } = props;
  return (
    <div className="comments-box p-3 mt-3 mb-2">
      <div className="reporter-comment p-3 mt-3 mb-2">
        <div className="d-flex justify-content-between align-items-center">
          {" "}
          <span className="text-muted">{reporterName}</span>{" "}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p>{reporterComment}</p>
        </div>
      </div>
      <div className="mt-2">
        <h6>{reviewerName}</h6>
        <p>{reviewerComment}</p>
      </div>
      <div className="row text-center">
        <div className="col">
          <button
            className="btn delete mx-4"
            type="button"
            onClick={() => props.onDelete(reviewId, reportId)}
          >
            Delete
          </button>
        </div>
        <div className="col">
          <button
            className="btn keep mx-4"
            type="button"
            onClick={() => props.onKeep(reportId)}
          >
            Keep
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportComment;
