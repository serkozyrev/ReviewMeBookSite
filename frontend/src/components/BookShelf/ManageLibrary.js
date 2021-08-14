import { useState, useEffect, useReducer, useMemo } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

import Title from "../style/Title";
import ManageBookItem from "./ManageBookItem";
import Pagination from "../style/Pagination";

import LibraryDataServices from "../../services/LibraryDataServices";

import "./BookShelf.css";

let PageSize = 12;

const ManageLibrary = (props) => {
  const { userId } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [libraryItems, setLibraryItems] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    getLibraryItems();
  }, []);

  const getLibraryItems = () => {
    LibraryDataServices.getLibraryByUseId(localStorage.getItem("user")).then(
      (library) => {
        for (let i = 0; i < library.length; i++) {
          library[i].isSelected = false;
        }
        setLibraryItems(library);
      }
    );
  };

  const bookData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return libraryItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, libraryItems]);

  const getManageBookShelf = (index) => {
    let libraryItemsArr = libraryItems;
    libraryItemsArr[index].isSelected = !libraryItemsArr[index].isSelected;
    setLibraryItems(libraryItemsArr);

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
    for (let i = 0; i < libraryItems.length; i++) {
      if (libraryItems[i].isSelected) {
        bookItems.push(libraryItems[i].libraryitemid);
      }
    }

    LibraryDataServices.deleteLibraryItem(bookItems).then((isDeleted) => {
      getLibraryItems();
    });
  };

  return (
    <div className="container bookShelfContainer">
      <Title name="Manage Library" />
      <h5 className="subTitle">
        Select book(s) you want to delete on the library and click delete icon
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
            totalCount={libraryItems.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageLibrary;
