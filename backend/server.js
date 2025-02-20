require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const sqlite3 = require('better-sqlite3');
const Rock = require('./rockyou.js');
const rateLimit = require('express-rate-limit');

Rock.getRockYou();

const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 3000;

const loginLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts. Please try again later.'
});

const db = new sqlite3('users.db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        if (Rock.rockyou.includes(password)) {
            return res.status(400).json({ message: 'Password is too common.' });
        } else {

            const hashedPassword = await bcryptjs.hash(password, saltRounds);

            const checkUserSql = db.prepare('SELECT * FROM users WHERE email = ?');
            const user = checkUserSql.get(email);
            if (user) {
                return res.status(400).json({ message: 'User already exists.' });
            }

            const insertUserSql = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
            insertUserSql.run(email, hashedPassword);

            return res.status(201).json({ message: 'User registered successfully.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/login', loginLimit, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        const checkUserSql = db.prepare('SELECT * FROM users WHERE email = ?');
        const user = checkUserSql.get(email);

        if (!user) {
            return res.status(400).json({ message: 'User does not exist.' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        return res.status(200).json({ message: 'User logged in successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});