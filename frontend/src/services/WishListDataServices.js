import axios from "axios";

export default {
  getWishListByUseId(userId) {
    return axios.get(`/wishlist-item/${userId}`).then((res) => {
      if (res.data.errCode === 0) {
        return res.data.wishlist[0];
      } else {
        console.log(res.data);
      }
    });
  },

  addWishlist(newBookItem) {
    return axios.post(`/wishlist-item/add`, newBookItem).then((res) => {
      if (res.data.errCode === 0) {
        return true;
      } else {
        return false;
      }
    });
  },

  deleteWishlist(deleteItemList) {
    return axios
      .delete(`/wishlist-item/delete/${deleteItemList}`)
      .then((res) => {
        if (res.data.errCode === 0) {
          return true;
        } else {
          return false;
        }
      });
  },
};
