import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//initialize an uploads folder to store images
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.use('/uploads', express.static('uploads'));

const db = new sqlite3.Database('./items.db');

//initializing multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const filenameCreated = Date.now() + path.extname(file.originalname) //creates a filename using date in case same name used for a file
        cb(null, filenameCreated);
    }
});

const upload = multer({ storage });

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER NOT NULL,
        user TEXT NOT NULL,
        text TEXT NOT NULL,
        FOREIGN KEY (item_id) REFERENCES items(id)
    )`);

    //Ratings table
    db.run(`CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER NOT NULL,
        user TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        FOREIGN KEY (item_id) REFERENCES items(id)
    )`);

    //image table generation
    db.all("PRAGMA table_info(items)", [], (err, columns) => {
        if (err) {
            console.error(err);
            return;
        }

        const imageURLFound = columns.some(col => col.name === "image_url");
        if (!imageURLFound) {
            db.run("ALTER TABLE items ADD COLUMN image_url TEXT");
        }
    });
});

app.get('/items', (req, res) => {
    const itemId = req.query.id;

    db.get("SELECT * FROM items WHERE id = ?", [itemId], (err, item) => {
        db.all("SELECT * FROM comments WHERE item_id = ?", [itemId], (err, comments) => {
            res.json({ item, comments });
        });
    });
});

app.get('/ratings/:itemId', (req, res) => {
    const { itemId } = req.params;

    db.get(
        `SELECT COUNT(*) AS rating_count, ROUND(AVG(rating), 1) AS average_rating
         FROM ratings
         WHERE item_id = ?`,
        [itemId],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to load ratings' });
            }

            res.json({
                item_id: Number(itemId),
                rating_count: row?.rating_count || 0,
                average_rating: row?.average_rating || 0
            });
        }
    );
});

/*
Start of Added Item Listing Server-side Functionality:
*/

app.get('/all-items', (req, res) => {
    db.all("SELECT * FROM items ORDER BY id DESC", [], (err, rows) => {
        res.json(rows);
    });
});

app.post('/items', upload.single('image'), (req, res) => {
    const { name, price, description } = req.body;
    let image_url = null;

    if(req.file) {
        image_url = `/uploads/${req.file.filename}`;
    }

    db.run(
        "INSERT INTO items (name, price, description, image_url) VALUES (?, ?, ?, ?)",
        [name, price, description, image_url],
        function(err) {
            res.json({
                id: this.lastID,
                name,
                price,
                description,
                image_url
            });
        }
    );
});

/*
End of Added Item Listing Server-side Functionality
*/

app.post('/comments', (req, res) => {
    const { item_id, user, text } = req.body;

    db.run("INSERT INTO comments (item_id, user, text) VALUES (?, ?, ?)", [item_id, user, text], function(err) {
        res.json({ 
            id: this.lastID, 
            item_id, 
            user, 
            text 
        });
    });
});

app.post('/ratings', (req, res) => {
    const { item_id, user, rating } = req.body;
    const parsedRating = Number(rating);

    if (!item_id || !user || parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({ error: 'Valid item, user, and rating are required' });
    }

    db.run(
        "INSERT INTO ratings (item_id, user, rating) VALUES (?, ?, ?)",
        [item_id, user, parsedRating],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to save rating' });
            }

            res.json({
                id: this.lastID,
                item_id,
                user,
                rating: parsedRating
            });
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});