// auth.js
import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('/login', { username, password });
    const accessToken = response.data.accessToken;
    
    // Store access token in a secure HTTP cookie
    document.cookie = `accessToken=${accessToken}; Secure; HttpOnly; SameSite=Strict`;

    return true; // Login successful
  } catch (error) {
    console.error('Login error:', error);
    return false; // Login failed
  }
};

export const logout = () => {
  // Remove access token by expiring the cookie
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; HttpOnly; SameSite=Strict';
};

export const isAuthenticated = () => {
  // Check if access token is present in cookies
  return document.cookie.split(';').some(cookie => cookie.trim().startsWith('accessToken='));
};
