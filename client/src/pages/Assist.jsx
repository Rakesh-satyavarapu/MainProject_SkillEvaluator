import React, { useEffect } from 'react';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { useChatStore } from '../store/useChatStore';

const Assist = () => {
 const { fetchChatHistory } = useChatStore();

  useEffect(() => {
    fetchChatHistory(); // auto-load chats when page opens
  }, [fetchChatHistory]);

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto border rounded-2xl shadow-lg bg-white h-[90vh]">
      <div className="border-b p-4 text-lg font-semibold bg-blue-600 text-white rounded-t-2xl">
        💬 Gemini Chat Assistant
      </div>
      <ChatMessages />
      <ChatInput />
    </div>
  );
}

export default Assist

