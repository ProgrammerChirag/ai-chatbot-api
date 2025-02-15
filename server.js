import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chat', (req, res) => {
  return 'hello bsdk';
});

app.get('/', (req, res) => {
  res.send("AI Model API is running!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
