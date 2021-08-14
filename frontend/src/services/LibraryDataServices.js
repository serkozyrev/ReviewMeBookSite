import axios from "axios";

export default {
  getLibraryByUseId(userId) {
    return axios.get(`/library-item/${userId}`).then((res) => {
      if (res.data.errCode === 0) {
        return res.data.libraries[0];
      } else {
        console.log(res.data);
      }
    });
  },

  addLibraryItem(newBookItem) {
    return axios.post(`/library-item/add`, newBookItem).then((res) => {
      if (res.data.errCode === 0) {
        return true;
      } else {
        return false;
      }
    });
  },

  deleteLibraryItem(deleteItemList) {
    return axios
      .delete(`/library-item/delete/${deleteItemList}`)
      .then((res) => {
        if (res.data.errCode === 0) {
          return true;
        } else {
          return false;
        }
      });
  },
};
