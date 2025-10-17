import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isSending } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 border-t bg-white"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSending}
      />
      <button
        type="submit"
        disabled={isSending}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;
