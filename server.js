const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateStoryAndImages } = require('./services/ai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend files

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'KalaKatha API is running.' });
});

// Main generation endpoint
app.post('/api/generate-story', async (req, res) => {
    try {
        const { scenario, style } = req.body;
        
        if (!scenario || !style) {
            return res.status(400).json({ error: 'Missing required parameters: scenario and style.' });
        }

        const result = await generateStoryAndImages(scenario, style);
        
        res.json(result);
    } catch (error) {
        console.error('Error generating story:', error);
        res.status(500).json({ 
            error: 'Failed to generate story and images.',
            details: error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
