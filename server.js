import express from 'express';
import * as tf from '@tensorflow/tfjs-node';

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Create a simple TensorFlow.js model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 8, inputShape: [2], activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

// Compile the model
model.compile({
  optimizer: 'adam',
  loss: 'binaryCrossentropy',
  metrics: ['accuracy']
});

// Dummy training data (XOR problem)
const xs = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]], [4, 2]);
const ys = tf.tensor2d([[0], [1], [1], [0]], [4, 1]);

// Train the model
(async () => {
  await model.fit(xs, ys, { epochs: 100 });
  console.log('Model trained!');
})();

// API endpoint to make predictions
app.post('/predict', async (req, res) => {
  try {
    const { input } = req.body;

    // Convert input to tensor
    const inputTensor = tf.tensor2d([input], [1, 2]);

    // Make prediction
    const prediction = model.predict(inputTensor);
    const output = await prediction.data();

    res.json({ prediction: output[0] });
  } catch (error) {
    res.status(500).json({ error: 'Invalid input data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
