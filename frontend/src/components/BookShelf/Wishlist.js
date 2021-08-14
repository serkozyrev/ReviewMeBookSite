import { useState, useEffect, useMemo } from "react";
import { BsGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import Title from "../style/Title";
import BookItem from "./BookItem";
import Pagination from "../style/Pagination";

import WishListDataServices from "../../services/WishListDataServices";

import "./BookShelf.css";

let PageSize = 12;

const Wishlist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    WishListDataServices.getWishListByUseId(localStorage.getItem("user")).then(
      (wishlist) => {
        setWishlistItems(wishlist);
      }
    );
  }, []);

  const bookData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return wishlistItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, wishlistItems]);

  const displayWishlist = () => {
    return bookData.map((data, index) => (
      <BookItem
        key={index}
        image={data.bookcover}
        title={data.booktitle}
        author={data.author}
        bookId={data.bookid}
      />
    ));
  };

  return (
    <div className="container bookShelfContainer">
      <Title name="Wish List" />
      <h5 className="subTitle">Store the books you've already read!</h5>
      <div>
        <Link className="row justify-content-end" to="/wishlist/manage">
          <button className="col-2 col-lg-1" className="btnManage">
            <BsGearFill size={50} />
          </button>
          <div className="col-2 col-lg-1"></div>
        </Link>
      </div>
      <div className="row justify-content-first bookItemcontainer">
        {displayWishlist()}
        <div className="d-flex justify-content-center">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={wishlistItems.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
