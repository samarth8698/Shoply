import axios from "axios";

const API_URL = "http://localhost:8080/wishlist";

export const getWishlist = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addWishlist = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const deleteWishlist = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};