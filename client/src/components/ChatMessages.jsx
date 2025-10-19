import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';

const ChatMessages = () => {
  const { chats, currentTyping, isLoading } = useChatStore();
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever chats or currentTyping change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, currentTyping]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Loading chats...
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto p-4 gap-4 h-[70vh] bg-white rounded-lg shadow-inner">
      {/* Completed chats */}
      {chats.map((chat, index) => (
        <div key={index} className="space-y-2">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-black px-4 py-2 rounded-2xl max-w-[70%] break-words">
              {chat.userMessage}
            </div>
          </div>

          {/* Bot Reply */}
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[70%] break-words border">
              {chat.botReply}
            </div>
          </div>
        </div>
      ))}

      {/* Current typing message */}
      {currentTyping && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[70%] break-words">
              {currentTyping.userMessage}
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[70%] break-words border">
              <span className="animate-pulse text-gray-500">Typing...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
