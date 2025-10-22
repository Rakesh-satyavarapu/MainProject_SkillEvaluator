import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // 🔹 AUTH STATE
      authUser: null,
      isSigningUp: false,
      isLoggedIn: false,
      isCheckingAuth: true,

      // 🔹 AUTH ACTIONS
      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data });
        } catch (error) {
          console.error("Error in checking auth:", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signUp: async ({ name, email, password }) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/register", {
            name,
            email,
            password,
          });
          set({ authUser: res.data });
          toast.success("Account created successfully");
        } catch (error) {
          toast.error(error.response?.data?.msg || "Signup failed");
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async ({ email, password }) => {
        set({ isLoggedIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", {
            email,
            password,
          });
          set({ authUser: res.data });
          toast.success("Logged in successfully");
        } catch (error) {
          toast.error(error.response?.data?.msg || "Login failed");
        } finally {
          set({ isLoggedIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.get("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (error) {
          toast.error(error.response?.data?.msg || "Logout failed");
        }
      },

      isAdmin: () => {
        const user = get().authUser;
        return user?.role === "admin";
      },

      // 🔹 DASHBOARD STATS
      stats: {
        totalUsers: 0,
        totalSkills: 0,
        totalQuestions: 0,
        totalAttempts: 0,
      },
      isLoading: false,

      fetchDashboardStats: async () => {
        set({ isLoading: true });
        try {
          const res = await axiosInstance.get("/auth/homeDetails");

          // ✅ handle flexible response format
          const data = res.data.data || res.data;

          set({
            stats: {
              totalUsers: data.totalUsers || 0,
              totalSkills: data.totalSkills || 0,
              totalQuestions: data.totalQuestions || 0,
              totalAttempts: data.totalAttempts || 0,
            },
          });
        } catch (error) {
          console.error("Error fetching dashboard stats:", error);
          toast.error("Failed to load dashboard stats");
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage", // persisted in localStorage
    }
  )
);
