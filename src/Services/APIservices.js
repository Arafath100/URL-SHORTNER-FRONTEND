import axios from "axios";

// Base URL for the API requests
const BASE_URL = "https://url-shortner-backend-task-guvi.onrender.com";

// Function to add a user by signing up
export const addUser = async (payload) => {
  const response = await axios.post(`${BASE_URL}/user/signup`, payload);
  return response;
};

// Function to activate a user account
export const activateAccount = async (id, token, payload) => {
  const response = await axios.post(
    `${BASE_URL}/user/activate/${id}/${token}`,
    payload
  );
  return response;
};

// Function to log in a user
export const userLogin = async (payload) => {
  const response = await axios.post(`${BASE_URL}/user/login`, payload);
  return response;
};

// Function to get all URLs
export const getAllURL = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/all`, data, config);
  return response;
};

// Function to get today's URLs
export const getTodayURL = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/today`, data, config);
  return response;
};

// Function to get monthly URLs
export const getMonthlyURL = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/monthly`, data, config);
  return response;
};

// Function to create a URL
export const createURL = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/createURL`, data, config);
  return response;
};

// Function to update URL click count
export const updateURLCount = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/clickcount`, data, config);
  return response;
};

// Function to handle forgot password request
export const forgotPassword = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/user/forgot-password`,
    payload
  );
  return response;
};

// Function to send activation mail
export const activationMail = async (payload) => {
  const response = await axios.post(`${BASE_URL}/user/activation`, payload);
  return response;
};

// Function to verify authorization for password reset
export const verifyAuthorization = async (id, token) => {
  const response = await axios.get(
    `${BASE_URL}/user/forgot-password/authorize/${id}/${token}`
  );
  return response;
};

// Function to reset user password
export const resetPassword = async (id, payload) => {
  const response = await axios.post(
    `${BASE_URL}/user/reset-password/${id}`,
    payload
  );
  return response;
};
