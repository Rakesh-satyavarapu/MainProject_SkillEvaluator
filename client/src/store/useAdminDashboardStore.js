import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminDashboardStore = create((set) => ({
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
      const res = await axiosInstance.get("/admin/dashboard");
      set({ stats: res.data.data });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to load dashboard stats");
    } finally {
      set({ isLoading: false });
    }
  },
}));
