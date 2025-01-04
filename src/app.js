const express = require('express');
const app = express();
const cors = require('cors');
const { db } = require('../database/db');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function for async database queries
const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Get all categories
app.get('/categories', async (req, res) => {
    try {
        const query = 'SELECT * FROM category';
        const categories = await runQuery(query);
        if (categories.length === 0) {
            return res.status(404).json({ error: 'No categories found' });
        }
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err.message);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get subcategories by category ID
app.get('/sub-category/:id', async (req, res) => {
    const categoryId = req.params.id;

    // Validate input
    if (isNaN(categoryId)) {
        return res.status(400).json({ error: 'Invalid category ID' });
    }

    try {
        const query = 'SELECT * FROM sub_category WHERE cat_id = ?';
        const subcategories = await runQuery(query, [categoryId]);
        if (subcategories.length === 0) {
            return res.status(404).json({ error: 'No subcategories found for this category' });
        }
        res.json(subcategories);
    } catch (err) {
        console.error('Error fetching subcategories:', err.message);
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
});

// Get duas by subcategory ID
app.get('/dua/:id', async (req, res) => {
    const subcategoryId = req.params.id;

    // Validate input
    if (isNaN(subcategoryId)) {
        return res.status(400).json({ error: 'Invalid subcategory ID' });
    }

    try {
        const query = 'SELECT * FROM dua WHERE subcat_id = ?';
        const duas = await runQuery(query, [subcategoryId]);
        if (duas.length === 0) {
            return res.status(404).json({ error: 'No duas found for this subcategory' });
        }
        res.json(duas);
    } catch (err) {
        console.error('Error fetching duas:', err.message);
        res.status(500).json({ error: 'Failed to fetch duas' });
    }
});

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to duah!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
