const express = require('express');
const app = express();
const cors = require('cors');
const { db } = require('../database/db');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.get('/categories', (req, res) => {
    const query = 'SELECT * FROM category';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(' Error fetching categories:', err.message);
            return res.status(500).json({ error: 'Failed to fetch categories' });
        }
        res.json(rows); 
    });
});

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to duah!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
