import { useState, useEffect, useReducer, useMemo } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

import Title from "../style/Title";
import ManageBookItem from "./ManageBookItem";
import Pagination from "../style/Pagination";

import WishListDataServices from "../../services/WishListDataServices";

import "./BookShelf.css";

let PageSize = 12;

const ManageWishlist = (props) => {
  const { userId } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    getWishlistItems();
  }, []);

  const getWishlistItems = () => {
    WishListDataServices.getWishListByUseId(localStorage.getItem("user")).then(
      (wishlist) => {
        for (let i = 0; i < wishlist.length; i++) {
          wishlist[i].isSelected = false;
        }
        setWishlistItems(wishlist);
      }
    );
  };

  const bookData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return wishlistItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, wishlistItems]);

  const getManageBookShelf = (index) => {
    let wishlistItemsArr = wishlistItems;
    wishlistItemsArr[index].isSelected = !wishlistItemsArr[index].isSelected;
    setWishlistItems(wishlistItemsArr);

    forceUpdate();
  };

  const displayBookShelf = () => {
    return bookData.map((data, index) => (
      <ManageBookItem
        getManageBookShelf={getManageBookShelf}
        key={index}
        itemIndex={index}
        image={data.bookcover}
        title={data.booktitle}
        author={data.author}
        bookId={data.bookid}
        isSelected={data.isSelected}
      />
    ));
  };

  const onClickDeleteIcon = () => {
    let bookItems = [];
    for (let i = 0; i < wishlistItems.length; i++) {
      if (wishlistItems[i].isSelected) {
        bookItems.push(wishlistItems[i].wishlistid);
      }
    }

    WishListDataServices.deleteWishlist(bookItems).then((isDeleted) => {
      getWishlistItems();
    });
  };

  return (
    <div className="container bookShelfContainer">
      <Title name="Manage Wish List" />
      <h5 className="subTitle">
        Select book(s) you want to delete on the wish list and click delete icon
      </h5>
      <div className="row justify-content-end">
        <button className="col-2 col-lg-1" className="btnManage">
          <RiDeleteBin5Fill
            size={50}
            onClick={() => {
              onClickDeleteIcon();
            }}
          />
        </button>
        <div className="col-2 col-lg-1"></div>
      </div>
      <div className="row justify-content-first bookItemcontainer">
        {displayBookShelf()}
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

export default ManageWishlist;
