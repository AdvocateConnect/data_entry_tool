const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Database setup
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        age INTEGER,
        address TEXT,
        gender TEXT
    )`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// API route
app.post('/submit', (req, res) => {
    const { name, email, age, address, gender } = req.body;
    db.run('INSERT INTO entries (name, email, age, address, gender) VALUES (?, ?, ?, ?, ?)', [name, email, age, address, gender], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error: ' + err.message });
        }
        res.json({ message: 'Data submitted successfully!' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
