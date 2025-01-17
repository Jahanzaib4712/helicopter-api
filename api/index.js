const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Load helicopters data
console.log("Loading helicopters data...");
const data = JSON.parse(fs.readFileSync('helicopters.json', 'utf-8'));
const helicopters = data.helicopters || [];  // Access the 'helicopters' array
console.log("Helicopters data loaded successfully");

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Helicopter API!');
});

// Get all helicopters
app.get('/api/helicopters', (req, res) => {
    res.json(helicopters);
});

// Get a single helicopter by ID
app.get('/api/helicopters/:id', (req, res) => {
    const helicopter = helicopters.find(h => h.id === req.params.id);
    if (helicopter) {
        res.json(helicopter);
    } else {
        res.status(404).json({ message: 'Helicopter not found' });
    }
});

// Export the app for Vercel
module.exports = app;
