import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import $ from "jquery";

import "./SearchResult.css";

const SearchResult = (props) => {
  const renderRating = (rating) => {
    if ($(window).width() > 280) {
      if (typeof rating === "undefined") {
        return (
          <Rating
            // className="stars"
            name="size-small"
            value={0}
            precision={0.5}
            disabled={true}
          />
        );
      } else {
        return (
          <Rating
            // className="stars"
            name="size-small"
            value={rating}
            precision={0.5}
            disabled={true}
          />
        );
      }
    } else {
      if (typeof rating === "undefined") {
        return (
          <Rating
            name="size-small"
            value={0}
            size="small"
            precision={0.5}
            disabled={true}
          />
        );
      } else {
        return (
          <Rating
            name="size-small"
            value={rating}
            size="small"
            precision={0.5}
            disabled={true}
          />
        );
      }
    }
  };
  const url = "/details/" + props.id;

  return (
    <div className="card search-result  mb-3 mx-3 px-3 py-3">
      <Link to={url} className="bookLink">
        <div className="row g-0">
          <div className="col-md-3 tex-center mt-4 mb-4">
            <img
              src={props.image}
              className="img-thumbnail mx-auto d-block"
              alt={props.title}
            />
          </div>
          <div className="col-md">
            <h4 className="book-title mt-4 fw-bold">{props.title}</h4>
            <span className="row justify-content-around">
              <span className="col-6 col-lg-8 d-flex">
                <span className="fw-bold smallFont">Author</span>
                <div className="smallFont">: {props.author}</div>
              </span>
              <span className="col-6 col-lg-4 d-flex">
                <span className="fw-bold smallFont">Published</span>
                <div className="smallFont">: {props.date}</div>
              </span>
            </span>
            <span className="row justify-content-around">
              <span className="col-6 col-lg-8 d-flex">
                <span className="fw-bold smallFont">Category</span>
                <div className="smallFont">: {props.category}</div>
              </span>
              <span className="col-6 col-lg-4">
                {renderRating(props.rating)}
              </span>
            </span>
            <h5 className="mt-2 smallfont-desc">Description</h5>
            <p className="card-text smallFont">{props.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
