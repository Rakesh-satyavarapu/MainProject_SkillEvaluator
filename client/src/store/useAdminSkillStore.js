// src/store/useAdminSkillStore.js
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAdminSkillStore = create((set, get) => ({
  allSkills: [],
  generatedQuestions: [],
  isLoading: false,
  isProcessing: false,

  // ✅ Fetch all skills (admin)
  fetchAllSkills: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/admin/getSkills');
      set({ allSkills: res.data.data || [] });
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch skills');
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Add a new skill
  addSkill: async ({ name, description }) => {
    set({ isProcessing: true });
    try {
      await axiosInstance.post('/admin/addSkill', { name, description });
      toast.success('Skill added successfully');
      await get().fetchAllSkills();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add skill');
    } finally {
      set({ isProcessing: false });
    }
  },

   updateSkill: async ({ skillId, name, description }) => {
    set({ isProcessing: true });
    try {
      const res = await axiosInstance.put(`/admin/editSkill/${skillId}`, { name, description });
      if (res.status === 200) {
        toast.success('Skill updated successfully');
        await get().fetchAllSkills(); // Refresh skills
        return true;
      } else {
        toast.error('Failed to update skill');
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update skill');
      return false;
    } finally {
      set({ isProcessing: false });
    }
  },

  // ✅ Delete skill
  deleteSkill: async (skillId) => {
    set({ isProcessing: true });
    try {
      await axiosInstance.delete(`/admin/deleteSkill/${skillId}`);
      toast.success('Skill deleted successfully');
      await get().fetchAllSkills();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to delete skill');
    } finally {
      set({ isProcessing: false });
    }
  },

  // ✅ Generate questions for a skill
  generateQuestions: async ({ skillId, level }) => {
    set({ isProcessing: true, generatedQuestions: [] });
    try {
      const res = await axiosInstance.post('/admin/generateQuestions', { skillId, level });
      const questions = res.data.questions || res.data.data || [];
      set({ generatedQuestions: questions });
      toast.success('Questions generated successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to generate questions');
    } finally {
      set({ isProcessing: false });
    }
  }

}));
