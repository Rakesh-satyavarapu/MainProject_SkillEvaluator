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
    <form onSubmit={handleSubmit} className="d-flex p-3 bg-white w-100">
      {/* Input occupies 70% */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="form-control me-2 flex-grow-1"
        style={{ width: '80%' }}
        disabled={isSending}
      />

      {/* Button occupies 30% */}
      <button
        type="submit"
        disabled={isSending}
        className="btn btn-primary"
        style={{ width: '20%' }}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;
