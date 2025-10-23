const Chat = require('../models/chat.model.js');
const axios = require('axios');

exports.chatWithGemini = async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: userMessage }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    let reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply from Gemini.";

    // Clean up Gemini response and structure it
    reply = reply
      .replace(/\/\/|[*#`]/g, '')             // remove //, *, #, backticks
      .replace(/^\s*\d+\.\s*/gm, '-')        // numbered points -> '-'
      .replace(/\r\n|\r/g, '\n')             // normalize line breaks
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .slice(0, 10)                           // limit to first 10 lines for brevity
      .join('\n');

    await Chat.create({
      userId: req.user.id,
      userMessage,
      botReply: reply,
    });

    res.json({ reply });

  } catch (error) {
    console.error("Gemini Chat Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Error communicating with Gemini API", error: error.message });
  }
};

exports.chatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({ timestamp: 1 });
    res.json({ chats });
  } catch (error) {
    console.error("Error fetching chat history:", error.message);
    res.status(500).json({ message: "Error fetching chat history", error: error.message });
  }
};
