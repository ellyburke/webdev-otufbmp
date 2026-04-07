import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./items.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item_id INTEGER NOT NULL,
        user TEXT NOT NULL,
        text TEXT NOT NULL,
        FOREIGN KEY (item_id) REFERENCES items(id)
    )`);
});

app.get('/items', (req, res) => {
    const itemId = req.query.id;

    db.get("SELECT * FROM items WHERE id = ?", [itemId], (err, item) => {
        db.all("SELECT * FROM comments WHERE item_id = ?", [itemId], (err, comments) => {
            res.json({ item, comments });
        });
    });
});

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});