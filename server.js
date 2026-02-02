
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;
const API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { "role": "system", "content": "You are casper.ai, a helpful assistant." },
          { "role": "user", "content": userMessage }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(PORT, () => {
  console.log(`casper.ai running at http://localhost:${PORT}`);
});
