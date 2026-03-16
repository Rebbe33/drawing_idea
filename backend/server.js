const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-ideas', async (req, res) => {
  try {
    const { types, level, theme, count } = req.body;

    const timestamp = Date.now();
const randomSeed = Math.floor(Math.random() * 10000);

const prompt = `Tu es un expert créatif en arts visuels. Génère ${count} idées de dessin ORIGINALES et VARIÉES.

IMPORTANT: Chaque idée doit être UNIQUE et DIFFÉRENTE des concepts classiques. Évite les clichés.

Contexte:
- Types souhaités: ${types}
- Niveau technique: ${level}
- Thème: ${theme}
- Seed créatif: ${randomSeed} (utilise ce nombre pour varier tes réponses)

Instructions:
- Sois AUDACIEUX et ORIGINAL dans tes propositions
- Varie les sujets, angles de vue, et approches
- Mélange des concepts inattendus
- Propose des idées qui surprennent et inspirent
- JAMAIS les mêmes idées deux fois de suite

Format JSON uniquement (pas de markdown):
[{"type":"...","titre":"...","description":"...","conseil":"..."}]

Génère maintenant ${count} idées complètement différentes et créatives.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    let text = data.content.map(b => b.text || '').join('').trim();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');

    if (start === -1 || end === -1) {
      throw new Error('Invalid JSON response');
    }

    const jsonStr = text.substring(start, end + 1);
    const ideas = JSON.parse(jsonStr);

    res.json({ success: true, ideas });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
