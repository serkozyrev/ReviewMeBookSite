import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./SliderImage.css";

const SliderImage = (props) => {
  const { book } = props;

  let settings = {
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    className: "slideImg",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {book.map((post, index) => (
        <div key={index} className="slidePoster">
          <Link to={`/details/${post.id}`}>
            <img
              className="slideImg"
              key={index}
              src={post.volumeInfo.imageLinks.thumbnail}
              alt=""
            />
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default SliderImage;
