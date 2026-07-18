import axios from "axios";

const API_URL = "http://localhost:8080/payments";

export const createOrder = async (amount) => {
  const response = await axios.post(`${API_URL}/create-order`, {
    amount,
  });

  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await axios.post(
    `${API_URL}/verify`,
    paymentData
  );

  return response.data;
};

export const savePayment = async (payment) => {
  const response = await axios.post(API_URL, payment);

  return response.data;
};

export const getPayments = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};