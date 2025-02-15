import express from 'express';
import brain from 'brain.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Train AI Model
const net = new brain.recurrent.LSTM();
net.train([
  { input: "hello", output: "Hi! How can I assist you?" },
  { input: "how are you?", output: "I'm an AI, but I'm doing great!" },
  { input: "what's your name?", output: "I'm your AI assistant!" },
  { input: "bye", output: "Goodbye! Have a great day!" }
]);

app.post('/chat', (req, res) => {
  const { message } = req.body;
  const response = net.run(message);
  res.json({ response });
});

app.get('/', (req, res) => {
  res.send("AI Model API is running!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
