import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isSending } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage('');
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSending && message.trim()) {
        await handleSubmit(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2 px-3 py-2">
        {/* Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isSending}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent outline-none",
            "px-4 py-3 text-gray-900 placeholder-gray-500",
            "rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-all duration-200 h-12 min-h-[3rem] max-h-[3rem] overflow-y-hidden"
          )}
        />

        {/* Send Button */}
        <motion.button
          type="submit"
          disabled={isSending || !message.trim()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "h-12 px-5 rounded-xl font-semibold",
            "bg-gradient-to-r from-primary-600 to-secondary-600 text-white",
            "hover:shadow-md transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2"
          )}
        >
          {isSending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="hidden sm:inline">Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span className="hidden sm:inline">Send</span>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default ChatInput;




// import React, { useState } from 'react';
// import { useChatStore } from '../store/useChatStore';

// const ChatInput = () => {
//   const [message, setMessage] = useState('');
//   const { sendMessage, isSending } = useChatStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;
//     await sendMessage(message);
//     setMessage('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="d-flex p-3 bg-white w-100">
//       {/* Input occupies 70% */}
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//         className="form-control me-2 flex-grow-1"
//         style={{ width: '80%' }}
//         disabled={isSending}
//       />

//       {/* Button occupies 30% */}
//       <button
//         type="submit"
//         disabled={isSending}
//         className="btn btn-primary"
//         style={{ width: '20%' }}
//       >
//         {isSending ? 'Sending...' : 'Send'}
//       </button>
//     </form>
//   );
// };

// export default ChatInput;

