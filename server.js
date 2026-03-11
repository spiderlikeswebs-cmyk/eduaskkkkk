const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

// Gemini API Key (Use environment variable for deployment)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDZgSmSPjNz5DDMy7MKQVrAyviNigKtiMY";

app.use(cors());
app.use(express.json());

// Serve all static files from the current directory
// Using path.resolve for absolute certainty
const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));

// Explicit Routes for major pages (to handle /ron instead of /ron.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/ron', (req, res) => {
    res.sendFile(path.join(publicPath, 'ron.html'));
});

// Ron AI Assistant API Endpoint
app.post('/api/ron', async (req, res) => {
    try {
        const { messages, temperature, max_tokens } = req.body;

        if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("PLACEHOLDER")) {
            return res.status(401).json({ error: "API Key is missing or invalid in server.js" });
        }

        const contents = messages.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: temperature || 0.7,
                    maxOutputTokens: max_tokens || 1024
                }
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return res.status(data.error.code || 500).json({ error: data.error.message });
        }

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            res.json({ message: aiText });
        } else {
            res.status(500).json({ error: "The AI assistant is temporarily unavailable." });
        }
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fallback for any other .html file
app.get('/:page', (req, res) => {
    const page = req.params.page;
    if (page.endsWith('.html')) {
        res.sendFile(path.join(publicPath, page));
    } else {
        res.sendFile(path.join(publicPath, `${page}.html`), (err) => {
            if (err) res.status(404).send('Page not found');
        });
    }
});

app.listen(PORT, () => {
    console.log(`\n\x1b[32m✔ EduAsk Platform is LIVE at: http://localhost:${PORT}\x1b[0m`);
    console.log(`\x1b[36mℹ Chat with Ron here: http://localhost:${PORT}/ron\x1b[0m\n`);
    console.log(`Working Directory: ${publicPath}`);
});
