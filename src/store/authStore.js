import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  userRole: null, // 'admin' or 'user'
  
  login: (userData) => set({
    user: userData,
    isAuthenticated: true,
    userRole: userData.role || 'user'
  }),
  
  logout: () => set({
    user: null,
    isAuthenticated: false,
    userRole: null
  }),
  
  updateUser: (userData) => set((state) => ({
    user: { ...state.user, ...userData }
  }))
}));

export default useAuthStore; 