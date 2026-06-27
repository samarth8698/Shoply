import axios from "axios";

const API_URL = "http://localhost:8080/products";

// Get All Products
export const getProducts = () => {
  return axios.get(API_URL);
};

// Get Product By Id
export const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Add Product
export const addProduct = (product) => {
  return axios.post(API_URL, product);
};

// Update Product
export const updateProduct = (id, product) => {
  return axios.put(`${API_URL}/${id}`, product);
};

// Delete Product
export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};