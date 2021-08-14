import LibraryDataServices from "../../services/LibraryDataServices";
import WishListDataServices from "../../services/WishListDataServices";

import "./Button.css";

const Button = (props) => {
  const {
    bookshelf,
    getBookshelf,
    addBookShelfInfo,
    name,
    isMargin,
    isRedirect,
    link,
    setPopupContent,
    setPopupTitle,
    togglePopup,
  } = props;

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const addData = () => {
    const bookId = addBookShelfInfo.bookId;
    if (addBookShelfInfo.userId !== 0) {
      if (name === "Library") {
        let isExist = checkExist(bookId);

        if (isExist) {
          setPopupTitle("Add Library");
          setPopupContent("This book is already on the library");
          togglePopup();
        } else {
          LibraryDataServices.addLibraryItem(addBookShelfInfo).then(
            (isAdded) => {
              if (isAdded) {
                getBookshelf();
                setPopupTitle("Add Library");
                setPopupContent("Successfully add book on the library");
                togglePopup();
              }
            }
          );
        }
      }

      if (name === "Wish List") {
        let isExist = checkExist(bookId);

        if (isExist) {
          setPopupTitle("Add Wish list");
          setPopupContent("This book is already on the wish list");
          togglePopup();
        } else {
          WishListDataServices.addWishlist(addBookShelfInfo).then((isAdded) => {
            if (isAdded) {
              getBookshelf();
              setPopupTitle("Add Wish list");
              setPopupContent("Successfully add book on the wish list");
              togglePopup();
            }
          });
        }
      }
    } else {
      setPopupTitle("Log In Validation");
      setPopupContent("Please log in before you add book on the library");
      togglePopup();
    }
  };

  const checkExist = (bookId) => {
    for (let i = 0; i < bookshelf.length; i++) {
      if (bookshelf[i].bookid === bookId) {
        return true;
      }
    }

    return false;
  };

  return (
    <button
      className={isMargin === true ? "btn buttonWithMargin" : "btn details"}
      onClick={isRedirect ? () => openInNewTab(link) : () => addData()}
    >
      {name}
    </button>
  );
};

export default Button;
