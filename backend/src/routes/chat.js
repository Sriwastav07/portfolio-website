import express from 'express';

const router = express.Router();

// ── Anisha's knowledge base ───────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a friendly AI assistant for Anisha Kumari's developer portfolio.
Answer questions concisely and helpfully about Anisha. Always be positive and professional.
Keep responses under 120 words unless a detailed list is needed.

ABOUT ANISHA:
Name: Anisha Kumari
Role: Full Stack Developer | AI & Data Enthusiast
Education: B.Tech Computer Science Engineering, Lovely Professional University

SKILLS:
- Languages: Java, Python, JavaScript
- Frontend: React, Vite, Tailwind CSS, HTML/CSS
- Backend: Node.js, Express.js, REST APIs
- Database: MongoDB, Mongoose
- AI/ML: Machine Learning, Power BI, Pandas
- Tools: Git, GitHub, VS Code, Figma, Postman

PROJECTS:
1. GST Invoice Generator — Full-stack app for generating GST-compliant invoices with PDF export.
   Tech: Node.js, Express.js, MongoDB
   GitHub: https://github.com/Sriwastav07/gst-Invoice-Genrator

2. AI Image Generator — Browser-based AI image tool powered by Pollinations API, no sign-up needed.
   Tech: HTML, Tailwind CSS, JavaScript, Pollinations API
   GitHub: https://github.com/Sriwastav07/imgGeneretor

3. Weather Pattern Clustering Dashboard — ML project clustering weather data with Power BI dashboard.
   Tech: Python, Power BI, Machine Learning, Pandas
   GitHub: https://github.com/Sriwastav07/Weather-report-clustering

CONTACT:
Email: anishasriwastav07@gmail.com
GitHub: https://github.com/sriwastav07
LinkedIn: https://linkedin.com/in/anisha172

If asked about something you don't know, say you're not sure and suggest they contact Anisha directly.`;

// ── POST /api/chat ─────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    // ── OpenAI (if key provided) ──────────────────────────────────
    if (apiKey && apiKey.startsWith('sk-')) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user',   content: message.trim() },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      return res.json({ reply: reply || "I'm not sure about that — please contact Anisha directly!" });
    }

    // ── Fallback: rule-based responses (no API key needed) ────────
    const reply = getRuleBasedReply(message.toLowerCase().trim());
    return res.json({ reply });

  } catch (err) {
    console.error('Chat error:', err.message);
    // Fallback gracefully on any error
    const reply = getRuleBasedReply(message.toLowerCase().trim());
    return res.json({ reply });
  }
});

// ── Rule-based fallback ────────────────────────────────────────────────────────
function getRuleBasedReply(msg) {
  if (/\b(hi|hello|hey|greet)/i.test(msg))
    return "Hi there! 👋 I'm Anisha's AI assistant. Ask me about her skills, projects, or background!";

  if (/\b(project|build|creat|work|portfolio)/i.test(msg))
    return "Anisha has built 3 featured projects:\n\n• GST Invoice Generator (Node.js, MongoDB)\n• AI Image Generator (JavaScript, Pollinations API)\n• Weather Pattern Clustering (Python, ML, Power BI)\n\nAll are on her GitHub!";

  if (/\b(skill|know|tech|language|stack)/i.test(msg))
    return "Anisha's tech stack includes:\n\n• Frontend: React, Tailwind CSS, JavaScript\n• Backend: Node.js, Express.js\n• Database: MongoDB\n• AI/ML: Python, Machine Learning, Power BI\n• Tools: Git, Figma, VS Code";

  if (/\b(educat|degree|university|study|college|lpu)/i.test(msg))
    return "Anisha is pursuing a B.Tech in Computer Science Engineering at Lovely Professional University (LPU). She combines academic learning with hands-on full-stack and AI/ML projects.";

  if (/\b(contact|email|reach|hire|job|opportunit)/i.test(msg))
    return "You can reach Anisha at:\n\n📧 anishasriwatav07@gmail.com\n💼 linkedin.com/in/anisha172\n🐙 github.com/sriwastav07\n\nShe's open to exciting full-stack and AI opportunities!";

  if (/\b(experience|year|background|about|who)/i.test(msg))
    return "Anisha is a full-stack developer and AI & data enthusiast passionate about building thoughtful digital products. She works across the stack — from React frontends to Node.js/MongoDB backends — and also explores machine learning.";

  if (/\b(github|repo|code|open.?source)/i.test(msg))
    return "Anisha's GitHub is github.com/sriwastav07. You'll find her projects including the GST Invoice Generator, AI Image Generator, and Weather Clustering Dashboard there!";

  if (/\b(avail|hire|freelanc|work|opportunit)/i.test(msg))
    return "Yes! Anisha is available for work and open to full-stack development, AI/ML, and data science roles. Reach her at anishasriwatav07@gmail.com 🚀";

  return "Great question! I'm not sure about that specific detail. For more info, you can reach Anisha directly at anishasriwatav07@gmail.com or check her GitHub at github.com/sriwastav07.";
}

export default router;
