// // src/store/useSkillStore.js
// import { create } from 'zustand';
// import { axiosInstance } from '../lib/axios';
// import toast from 'react-hot-toast';

// export const useSkillStore = create((set, get) => ({
//   allSkills: [],
//   registeredSkills: [],
//   tests: {},          // skillId -> questions
//   testResults: {},    // skillId -> result
//   attempts: {},  // attemptId -> attempt details
//   isLoading: false,
//   isProcessing: false,

//   // ✅ Fetch all skills
//   fetchAllSkills: async () => {
//     set({ isLoading: true });
//     try {
//       const res = await axiosInstance.get('/skill/getSkills');
//       set({ allSkills: res.data.data || [] });
//     } catch (error) {
//       toast.error('Failed to fetch skills');
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // ✅ Fetch current user's registered skills
//   fetchRegisteredSkills: async () => {
//     set({ isLoading: true });
//     try {
//       const res = await axiosInstance.get('/auth/check');
//       set({ registeredSkills: res.data.registeredSkills || [] });
//     } catch (error) {
//       toast.error('Failed to fetch registered skills');
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // ✅ Register skill
//   registerSkill: async ({ skillId, level }) => {
//     set({ isProcessing: true });
//     try {
//       await axiosInstance.post('/user/skillRegister', { skill: skillId, level });
//       toast.success('Skill registered successfully');
//       await get().fetchRegisteredSkills();
//       await get().fetchAllSkills();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to register skill');
//     } finally {
//       set({ isProcessing: false });
//     }
//   },

//   // ✅ Withdraw skill
//   withdrawSkill: async (skillId) => {
//     set({ isProcessing: true });
//     try {
//       await axiosInstance.post('/user/skillWithdraw', { skillId });
//       toast.success('Skill withdrawn successfully');
//       await get().fetchRegisteredSkills();
//       await get().fetchAllSkills();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to withdraw skill');
//     } finally {
//       set({ isProcessing: false });
//     }
//   },

//   takeTest: async ({ skillId, level }) => {
//     set({ isLoading: true });
//     try {
//       const res = await axiosInstance.post('/user/takeTest', { skillId, level });
//       set((state) => ({
//         tests: { ...state.tests, [skillId]: { attemptId: res.data.attemptId, questions: res.data.data } },
//       }));
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to fetch test questions');
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   submitTest: async ({ attemptId, answers, skillId }) => {
//     set({ isProcessing: true });
//     try {
//       const res = await axiosInstance.post('/user/submitTestAnswers', { attemptId, answers });
//       set((state) => ({
//         testResults: { ...state.testResults, [skillId]: res.data },
//         tests: { ...state.tests, [skillId]: null },
//       }));
//       toast.success('Test submitted successfully');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to submit test');
//     } finally {
//       set({ isProcessing: false });
//     }
//   },

//    fetchTestHistory: async (skillId) => {
//     set({ isLoading: true });
//     try {
//       const res = await axiosInstance.get(`/user/skill/${skillId}/testHistory`);
//       set((state) => ({
//         testHistory: { ...state.testHistory, [skillId]: res.data.attempts || [] },
//       }));
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to fetch test history');
//     } finally {
//       set({ isLoading: false });
//     }
    
//   },

//   fetchAttemptById: async (attemptId) => {
//     set({ isLoading: true });
//     try {
//       const res = await axiosInstance.get(`/user/attempt/${attemptId}`);
//       set((state) => ({
//         attempts: { ...state.attempts, [attemptId]: res.data.attempt },
//       }));
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to fetch attempt');
//     } finally {
//       set({ isLoading: false });
//     }
//   },

  
//   getRegisteredSkill: (skillId) =>
//     get().registeredSkills.find(
//       (s) => s.skill.toString() === skillId && s.status === 'registered'
//     ),
// }));


// src/store/useSkillStore.js
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useSkillStore = create((set, get) => ({
  allSkills: [],
  registeredSkills: [],
  tests: {},          // skillId -> { attemptId, questions }
  testResults: {},    // skillId -> full test result (with badges)
  attempts: {},       // attemptId -> attempt details
  testHistory: {},    // skillId -> list of attempts
  isLoading: false,
  isProcessing: false,

  // ✅ Fetch all skills
  fetchAllSkills: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/skill/getSkills');
      set({ allSkills: res.data.data || [] });
    } catch (error) {
      toast.error('Failed to fetch skills');
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Fetch registered skills
  fetchRegisteredSkills: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ registeredSkills: res.data.registeredSkills || [] });
    } catch (error) {
      toast.error('Failed to fetch registered skills');
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Register skill
  registerSkill: async ({ skillId, level }) => {
    set({ isProcessing: true });
    try {
      await axiosInstance.post('/user/skillRegister', { skill: skillId, level });
      toast.success('Skill registered successfully');
      await get().fetchRegisteredSkills();
      await get().fetchAllSkills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register skill');
    } finally {
      set({ isProcessing: false });
    }
  },

  // ✅ Withdraw skill
  withdrawSkill: async (skillId) => {
    set({ isProcessing: true });
    try {
      await axiosInstance.post('/user/skillWithdraw', { skillId });
      toast.success('Skill withdrawn successfully');
      await get().fetchRegisteredSkills();
      await get().fetchAllSkills();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to withdraw skill');
    } finally {
      set({ isProcessing: false });
    }
  },

  // ✅ Take test
  takeTest: async ({ skillId, level }) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/user/takeTest', { skillId, level });
      set((state) => ({
        tests: {
          ...state.tests,
          [skillId]: {
            attemptId: res.data.attemptId,
            questions: res.data.data,
          },
        },
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch test questions');
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Submit test (with badges support)
  submitTest: async ({ attemptId, answers, skillId }) => {
    set({ isProcessing: true });
    try {
      const res = await axiosInstance.post('/user/submitTestAnswers', { attemptId, answers });
      
      set((state) => {
        const updatedTests = { ...state.tests };
        delete updatedTests[skillId];
        return {
          testResults: { ...state.testResults, [skillId]: res.data },
          tests: updatedTests,
        };
      });

      toast.success('Test submitted successfully');
      return res.data; // 🏅 Return so pages can access badges immediately
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit test');
    } finally {
      set({ isProcessing: false });
    }
  },

  // ✅ Fetch test history
  fetchTestHistory: async (skillId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/user/skill/${skillId}/testHistory`);
      set((state) => ({
        testHistory: { ...state.testHistory, [skillId]: res.data.attempts || [] },
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch test history');
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Fetch attempt by ID
  fetchAttemptById: async (attemptId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/user/attempt/${attemptId}`);
      set((state) => ({
        attempts: { ...state.attempts, [attemptId]: res.data.attempt },
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch attempt');
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Get registered skill by ID
  getRegisteredSkill: (skillId) =>
    get().registeredSkills.find(
      (s) => s.skill.toString() === skillId && s.status === 'registered'
    ),
}));
