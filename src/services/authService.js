import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, {
    email,
  });

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${API_URL}/verify-otp`, {
    email,
    otp,
  });

  return response.data;
};

export const resetPassword = async (email, newPassword) => {
  const response = await axios.post(`${API_URL}/reset-password`, {
    email,
    newPassword,
  });

  return response.data;
};

export const changePassword = async (
  email,
  currentPassword,
  newPassword
) => {
  const response = await axios.post(`${API_URL}/change-password`, {
    email,
    currentPassword,
    newPassword,
  });

  return response.data;
};