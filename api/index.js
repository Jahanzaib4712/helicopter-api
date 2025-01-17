const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Load helicopters data from public folder
const dataPath = path.join(__dirname, '..', 'public', 'helicopters.json');  // Adjust path as needed
console.log("Loading helicopters data...");
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const helicopters = data.helicopters || [];
console.log("Helicopters data loaded successfully");

// Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Helicopter API!</h1><h3>by Shahzaib Nadeem</h3><p>Use <code>/api/helicopters</code> to view all helicopters.</p>');
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
