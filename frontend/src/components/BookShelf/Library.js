import { useState, useEffect, useMemo } from "react";
import { BsGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import Title from "../style/Title";
import BookItem from "./BookItem";
import Pagination from "../style/Pagination";

import LibraryDataServices from "../../services/LibraryDataServices";

import "./BookShelf.css";

let PageSize = 12;

const Library = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [libraryItems, setLibraryItems] = useState([]);

  useEffect(() => {
    LibraryDataServices.getLibraryByUseId(localStorage.getItem("user")).then(
      (library) => {
        setLibraryItems(library);
      }
    );
  }, []);

  const bookData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return libraryItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, libraryItems]);

  const displayLibrary = () => {
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
      <Title name="Library" />
      <h5 className="subTitle">
        Store the books you want to read in the future!
      </h5>
      <div>
        <Link className="row justify-content-end" to="/library/manage">
          <button className="col-2 col-lg-1" className="btnManage">
            <BsGearFill size={50} />
          </button>
          <div className="col-2 col-lg-1"></div>
        </Link>
      </div>
      <div className="row justify-content-first bookItemcontainer">
        {displayLibrary()}
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

export default Library;
