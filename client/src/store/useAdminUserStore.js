import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminUserStore = create((set, get) => ({
  users: [],
  isLoading: false,
  isProcessing: false,

  userDetails: null,
  isFetchingUser: false,

  fetchAllUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/admin/users");
      set({ users: res.data.data || [] });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserDetails: async (userId) => {
    set({ isFetchingUser: true });
    try {
      const res = await axiosInstance.get(`/admin/user/${userId}`);
      console.log(res)
      set({ userDetails: res.data.user });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch user details");
    } finally {
      set({ isFetchingUser: false });
    }
  },

  deleteUser: async (userId) => {
    set({ isProcessing: true });
    try {
      await axiosInstance.delete(`/admin/deleteUser/${userId}`);
      toast.success("User deleted successfully");
      await get().fetchAllUsers();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      set({ isProcessing: false });
    }
  },
}));
