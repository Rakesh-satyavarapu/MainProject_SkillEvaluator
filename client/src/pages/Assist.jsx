// Assist.jsx
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
    <div className="assist-container">
      <div className="chat-wrapper">
        <div className="chat-header">💬 AI Chat Assistant</div>
        <ChatMessages />
        <ChatInput />
      </div>

      <style>{`
        /* Container & Background */
        .assist-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 35%, #c7d2fe 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
          font-family: 'Inter', sans-serif;
        }

        /* Chat Box */
        .chat-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 850px;
          height: 90vh;
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          overflow: hidden;
          backdrop-filter: blur(6px);
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Header */
        .chat-header {
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          color: white;
          padding: 1.2rem;
          font-size: 1.2rem;
          font-weight: 600;
          text-align: center;
          border-top-left-radius: 18px;
          border-top-right-radius: 18px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 10px rgba(37,99,235,0.3);
        }

        /* Messages */
        .chat-message {
          padding: 0.9rem 1.2rem;
          margin: 0.8rem 1rem;
          border-radius: 16px;
          font-size: 0.98rem;
          line-height: 1.6;
          animation: fadeInUp 0.4s ease;
          word-break: break-word;
          white-space: pre-wrap;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* User message bubble */
        .chat-message.user {
          background: #2b4183ff;     /* blue bubble */
          color: #0a0101ff;          /* white text */
          align-self: flex-end;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 8px rgba(37,99,235,0.2);
          word-break: break-word;
          white-space: pre-wrap;   /* preserve line breaks */
        }

        /* Bot message bubble */
        .chat-message.bot {
          background: #345597ff;     /* light grey bubble */
          color: #01050aff !important; /* dark text, force visibility */
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          text-align: justify;
          word-break: break-word;
          white-space: pre-wrap;   /* preserve line breaks */
        }

        /* Scroll */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          scrollbar-width: thin;
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background-color: rgba(156,163,175,0.4);
          border-radius: 3px;
        }

        /* Input */
        .chat-input {
          border-top: 1px solid #e5e7eb;
          padding: 1rem;
          background-color: #f9fafb;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .chat-input input {
          flex: 1;
          padding: 0.7rem 1rem;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .chat-input input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
        }

        .chat-input button {
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 0.6rem 1.3rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .chat-input button:hover {
          background-color: #1e40af;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .chat-wrapper {
            height: 85vh;
          }
          .chat-header {
            font-size: 1.05rem;
            padding: 1rem;
          }
          .chat-input input {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Assist;
