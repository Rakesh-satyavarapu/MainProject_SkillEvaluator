import React, { useEffect } from 'react';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { useChatStore } from '../store/useChatStore';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const Assist = () => {
  const { fetchChatHistory } = useChatStore();

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br p-4 from-gray-50 via-white to-primary-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md"
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Assistant</h1>
            <p className="text-sm text-white/80">Ask me anything about skills and tests</p>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <ChatMessages />
      </div>

      {/* Sticky Input (flush bottom) */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200">
        <ChatInput />
      </div>
    </div>
  );
};

export default Assist;





// import React, { useEffect } from 'react';
// import ChatMessages from '../components/ChatMessages';
// import ChatInput from '../components/ChatInput';
// import { useChatStore } from '../store/useChatStore';

// const Assist = () => {
//   const { fetchChatHistory } = useChatStore();

//   useEffect(() => {
//     fetchChatHistory(); // auto-load chats when page opens
//   }, [fetchChatHistory]);

//   return (
//     <div className="assist-container">
//       <div className="chat-header">🗨️ AI Assistant</div>
//       <div className="chat-body">
//         <ChatMessages />
//       </div>
//       <ChatInput />

//       <style>{`
//         /* Overall page layout */
//         .assist-container {
//           position: relative;
//           top: 70px; /* space for fixed-top-70 navbar */
//           height: calc(100vh - 70px);
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//           font-family: 'Inter', sans-serif;
//         }

//         /* Header (no card look) */
//         .chat-header {
//           background: linear-gradient(90deg, #2563eb, #3b82f6);
//           color: white;
//           padding: 1rem;
//           font-size: 1.1rem;
//           font-weight: 600;
//           text-align: center;
//           letter-spacing: 0.5px;
//           box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
//         }

//         /* Chat body (scrollable messages) */
//         .chat-body {
//           flex: 1;
//           overflow-y: auto;
//           padding: 1rem;
//           display: flex;
//           flex-direction: column;
//           justify-content: flex-start;
//         }

//         /* Message bubbles */
//         .chat-message {
//           padding: 0.6rem 0.9rem;
//           margin: 0.5rem 0.8rem;
//           border-radius: 14px;
//           font-size: 0.88rem;
//           line-height: 1.5;
//           animation: fadeInUp 0.4s ease;
//           word-break: break-word;
//           white-space: pre-wrap;
//           max-width: 80%;
//         }

//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .chat-message.user {
//           background: #2b4183ff;
//           color: #ffffff;
//           align-self: flex-end;
//           border-bottom-right-radius: 4px;
//         }

//         .chat-message.bot {
//           background: #345597ff;
//           color: #ffffff;
//           align-self: flex-start;
//           border-bottom-left-radius: 4px;
//           text-align: justify;
//         }

//         /* Input bar (stays at bottom) */
//         .chat-input {
//           border-top: 1px solid #e5e7eb;
//           padding: 0.8rem;
//           background-color: #f9fafb;
//           display: flex;
//           align-items: center;
//           gap: 0.6rem;
//         }

//         .chat-input input {
//           flex: 1;
//           padding: 0.6rem 0.9rem;
//           border-radius: 10px;
//           border: 1px solid #d1d5db;
//           font-size: 0.9rem;
//           outline: none;
//           transition: border-color 0.2s ease;
//         }

//         .chat-input input:focus {
//           border-color: #2563eb;
//           box-shadow: 0 0 0 2px rgba(37,99,235,0.2);
//         }

//         .chat-input button {
//           background-color: #2563eb;
//           color: white;
//           border: none;
//           border-radius: 10px;
//           padding: 0.5rem 1.2rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .chat-input button:hover {
//           background-color: #1e40af;
//         }

//         /* Scrollbar style */
//         .chat-body::-webkit-scrollbar {
//           width: 6px;
//         }
//         .chat-body::-webkit-scrollbar-thumb {
//           background-color: rgba(156,163,175,0.4);
//           border-radius: 3px;
//         }

//         /* Responsive */
//         @media (max-width: 768px) {
//           .chat-header {
//             font-size: 1rem;
//             padding: 0.9rem;
//           }
//           .chat-input input {
//             font-size: 0.85rem;
//           }
//           .chat-input button {
//             padding: 0.45rem 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Assist;
