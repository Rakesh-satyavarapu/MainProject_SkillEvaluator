import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isSigningUp: false,
      isLoggedIn: false,
      isCheckingAuth: true,

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check");
          set({ authUser: res.data });
        } catch (error) {
          console.log("error in checking auth", error);
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
    }),
    { name: "auth-storage" } // stored in localStorage
  )
);
