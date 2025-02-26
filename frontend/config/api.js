import axios from 'axios';

// Base URL for Flask API (Make sure Flask is running on this address)
export const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Create an Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication Endpoints
export const ENDPOINTS = {
  signin: '/signin',
  signup: '/signup',
  getSecurityQuestion: '/get-security-question',
  resetPassword: '/reset-password',
};

// Sign In Request
export const signIn = async (email, password) => {
  try {
    const response = await apiClient.post(ENDPOINTS.signin, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Login failed' };
  }
};

// Sign Up Request
export const signUp = async (email, password, name, securityQuestion, securityAnswer) => {
  try {
    const response = await apiClient.post(ENDPOINTS.signup, {
      email,
      password,
      name,
      securityQuestion,
      securityAnswer,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Signup failed' };
  }
};

// Get Security Question for Password Reset
export const getSecurityQuestion = async (email) => {
  try {
    const response = await apiClient.post(ENDPOINTS.getSecurityQuestion, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Unable to fetch security question' };
  }
};

// Reset Password Request
export const resetPassword = async (email, securityAnswer, newPassword) => {
  try {
    const response = await apiClient.post(ENDPOINTS.resetPassword, {
      email,
      securityAnswer,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Password reset failed' };
  }
};
