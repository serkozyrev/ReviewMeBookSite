import axios from "axios";

export default {
  getAllBooks(bookParams) {
    return axios
      .get(`/home/${bookParams.q}&${bookParams.maxResults}`, bookParams)
      .then((res) => {
        if (res.data.errCode === 0) {
          return res.data.books;
        } else {
          console.log(res.data);
        }
      });
  },
  getBooksByID(id) {
    return axios.get(`/book-details/${id}`).then((res) => {
      if (res.data.errCode === 0) {
        return res.data.books;
      } else {
        console.log(res.data);
      }
    });
  },
  getBooksBySearch(bookParams) {
    return axios.get(`/home/${bookParams.q}`, bookParams).then((res) => {
      if (res.data.errCode === 0) {
        return res.data.books;
      } else {
        const noBook = {
          items: [],
        };
        return noBook;
      }
    });
  },
};
