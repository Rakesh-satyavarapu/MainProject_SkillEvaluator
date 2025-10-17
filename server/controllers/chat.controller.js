let axios = require('axios');
let Chat = require('../models/chat.model');

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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply from Gemini.";

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
