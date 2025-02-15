import express from "express";
import * as tf from "@tensorflow/tfjs";

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Example: Simple TensorFlow.js Model API
app.post("/predict", async (req, res) => {
    try {
        const { inputs } = req.body; // Expecting JSON: { "inputs": [1, 2, 3, 4] }

        if (!Array.isArray(inputs)) {
            return res.status(400).json({ error: "Invalid input format. Expecting an array." });
        }

        // Convert input to a Tensor
        const inputTensor = tf.tensor(inputs);
        
        // Simple TensorFlow operation (e.g., multiply by 2)
        const outputTensor = inputTensor.mul(2);
        
        // Convert Tensor to array and send response
        const outputArray = await outputTensor.array();
        res.json({ result: outputArray });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Express server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
