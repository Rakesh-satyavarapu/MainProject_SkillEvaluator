import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useChatStore = create((set, get) => ({
  chats: [],          // all completed chats (user + bot replies)
  currentTyping: null, // current message being typed/replied by bot
  isSending: false,
  isLoading: false,

  fetchChatHistory: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/user/chatHistory');
      set({ chats: res.data.chats });
    } catch (error) {
      toast.error("Failed to fetch chat history");
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (message) => {
    if (!message.trim()) return;

    set({ currentTyping: { userMessage: message, botReply: 'Typing...' }, isSending: true });

    try {
      const res = await axiosInstance.post('/user/chat', { message });
      const reply = res.data.reply;

      // Add completed chat to chats array
      set((state) => ({
        chats: [...state.chats, { userMessage: message, botReply: reply }],
        currentTyping: null,
      }));
    } catch (error) {
      toast.error("Failed to send message");
      set({ currentTyping: null });
    } finally {
      set({ isSending: false });
    }
  },
}));
