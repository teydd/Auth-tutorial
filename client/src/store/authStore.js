import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:2000/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name, tel) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
        tel,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        message: response.data.message || "Signup successful",
      });
      return { success: true };
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Error signing up. Please try again.";
      set({
        error: msg,
        isLoading: false,
        message: null,
      });
      return { success: false, message: msg };
    }
  },

  verify: async (code) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/verify`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        message: response.data.message || "Verification successful",
      });
      return { success: true };
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Error verifying email. Please try again.";
      set({
        error: msg,
        isLoading: false,
        message: null,
      });
      return { success: false, message: msg };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
        isLoading: false,
        message: response.data.message || "Login successful",
      });
      return { success: true };
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      set({
        error: msg,
        isLoading: false,
        message: null,
      });
      return { success: false, message: msg };
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
        error: null,
      });
    } catch (error) {
      set({
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
        user: null,
      });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        message: "Logged out successfully",
      });
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Logout failed. Please try again.";
      set({
        error: msg,
        isLoading: false,
        message: null,
      });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({
        message: response.data.message || "Password reset email sent.",
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Failed to send password reset email.";
      set({
        error: msg,
        isLoading: false,
        message: null,
      });
      return { success: false, message: msg };
    }
  },

  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        token,
        newPassword,
      });
      set({
        message: response.data.message || "Password reset successful.",
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Failed to reset password.";
      set({
        error: msg,
        isLoading: false,
        message: null,
      });
      return { success: false, message: msg };
    }
  },
}));
