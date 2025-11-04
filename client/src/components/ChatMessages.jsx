import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';

const ChatMessages = () => {
  const { chats, currentTyping, isLoading } = useChatStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, currentTyping]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent mx-auto mb-2"></div>
          <p className="text-gray-600">Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
      {chats.length === 0 && !currentTyping && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-4">
            <Bot className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Start a conversation</h3>
          <p className="text-gray-600 max-w-md">
            Ask questions about skills, tests, or get help with your learning journey!
          </p>
        </div>
      )}

      <AnimatePresence>
        {chats.map((chat, index) => (
          <div key={index} className="space-y-3">
            {/* User Message */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex justify-end"
            >
              <div className="flex items-end gap-2 max-w-[80%] sm:max-w-[70%]">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-lg">
                  <p className="text-sm whitespace-pre-wrap break-words">{chat.userMessage}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </motion.div>

            {/* Bot Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex justify-start"
            >
              <div className="flex items-end gap-2 max-w-[80%] sm:max-w-[70%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white text-gray-900 rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg border border-gray-200">
                  <p className="text-sm whitespace-pre-wrap break-words">{chat.botReply}</p>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </AnimatePresence>

      {/* Typing Indicator */}
      {currentTyping && (
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-end"
          >
            <div className="flex items-end gap-2 max-w-[80%] sm:max-w-[70%]">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-lg">
                <p className="text-sm">{currentTyping.userMessage}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg border border-gray-200">
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;





// import React, { useEffect, useRef } from 'react';
// import { useChatStore } from '../store/useChatStore';

// const ChatMessages = () => {
//   const { chats, currentTyping, isLoading } = useChatStore();
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom whenever chats or currentTyping change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chats, currentTyping]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-full text-gray-500">
//         Loading chats...
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col overflow-y-auto p-4 gap-4 h-[70vh] bg-white rounded-lg shadow-inner">
//       {/* Completed chats */}
//       {chats.map((chat, index) => (
//         <div key={index} className="space-y-2">
//           {/* User Message */}
//           <div className="flex justify-end">
//             <div className="bg-blue-500 text-black px-4 py-2 rounded-2xl max-w-[70%] break-words">
//               <b>{chat.userMessage}</b>
//             </div>
//           </div>

//           {/* Bot Reply */}
//           <div className="flex justify-start">
//             <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[70%] break-words ">
//               <span>🤖 :</span>{chat.botReply}
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Current typing message */}
//       {currentTyping && (
//         <div className="space-y-2">
//           <div className="flex justify-end">
//             <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-[70%] break-words">
//               {currentTyping.userMessage}
//             </div>
//           </div>
//           <div className="flex justify-start">
//             <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[70%] break-words border">
//               <span className="animate-pulse text-gray-500">Typing...</span>
//             </div>
//           </div>
//         </div>
//       )}

//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default ChatMessages;
