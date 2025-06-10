const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

router.post('/ask', async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Incoming message:", message);

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
const systemPrompt = `
You are PawSewa AI — a friendly, animal-focused assistant 🐾. 
Your job is to help users with quick, simple pet care guidance.

When replying:
- Always use clear bullet points ✅
- Keep each response under 6 lines
- Use cute, helpful emojis 🐶🐱🐮❤️
- Include a basic home remedy if safe, but keep it short
- NEVER include long paragraphs or repeat the same advice

Example format:
Oh no! Vomiting in cows can be tricky 🐮💦 Try these:
• Give fresh, clean water 💧
• Remove spoiled feed immediately 🛑
• Check for fever or bloating 🌡️
Home Remedy 🏠: Try slippery elm tea to soothe the stomach (only in small amounts).
If it continues, contact a vet 📞.
`;


    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama3-8b-8192", // updated from deprecated model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("🔥 Groq AI Error:", error.response?.data || error.message || error);
    res.status(500).json({ error: "Groq AI response failed" });
  }
});

module.exports = router;
