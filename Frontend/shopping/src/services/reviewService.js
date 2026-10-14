import axios from "axios";

const API_URL = "https://shoply-backend-p6zl.onrender.com/api/reviews";

export const getReviews = (productId) => {
  return axios.get(`${API_URL}/${productId}`);
};

export const addReview = (review) => {
  return axios.post(API_URL, review);
};
