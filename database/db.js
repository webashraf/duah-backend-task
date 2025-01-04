const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath =  path.join(__dirname, 'dua_main.sqlite');

// Initialize the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database at:', dbPath);
    }
});

// Graceful shutdown to close the database connection properly
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the SQLite database:', err.message);
        } else {
            console.log('SQLite database connection closed.');
        }
        process.exit(0);
    });
});



module.exports = { db };
