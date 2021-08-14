import { Link } from "react-router-dom";
import "./BookItem.css";

const BookItem = (props) => {
  const { image, title, author, bookId } = props;
  const linkUrl = "/details/" + bookId;
  return (
    <div className="col-6 col-md-4 col-lg-3 bookItemContainer">
      <div className="text-center">
        <Link to={linkUrl}>
          <img className="image" src={image} alt={title} />
        </Link>
        <Link to={linkUrl} className="bookInfoLink">
          <div className="bookInfoContainer">
            <h4>{title}</h4>
            <p>{author}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BookItem;
