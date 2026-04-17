import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use('/uploads', express.static('uploads'));

/*
  Used to apply database creation and SQL usage for user data management:
  https://www.npmjs.com/package/sqlite3
*/

const db = new sqlite3.Database('./items.db');

/*
  Used to apply image uploading for selling items:
  https://www.npmjs.com/package/multer
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filenameCreated = Date.now() + path.extname(file.originalname)
    cb(null, filenameCreated);
  },
})

const upload = multer({ storage });

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    country TEXT,
    account_id INTEGER,
    created_time TEXT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    user TEXT NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS favourites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    UNIQUE(account_id, item_id),
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    user TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    FOREIGN KEY (item_id) REFERENCES items(id)
  )`);

  db.all('PRAGMA table_info(items)', [], (err, columns) => {
    if (err) return console.error(err);

    const hasImage = columns.some((col) => col.name === 'image_url');
    const hasCountry = columns.some((col) => col.name === 'country');
    const hasAccountId = columns.some((col) => col.name === 'account_id');
    const hasCreatedTime = columns.some((col) => col.name === 'created_time');

    if (!hasImage) db.run('ALTER TABLE items ADD COLUMN image_url TEXT');
    if (!hasCountry) db.run('ALTER TABLE items ADD COLUMN country TEXT');
    if (!hasAccountId) db.run('ALTER TABLE items ADD COLUMN account_id INTEGER');
    if (!hasCreatedTime) {
      db.run("ALTER TABLE items ADD COLUMN created_time TEXT");
      db.run("UPDATE items SET created_time = datetime('now') WHERE created_time IS NULL");
    }
  })
})

app.get('/items', (req, res) => {
  const itemId = req.query.id;

  db.get(
    `SELECT items.*, accounts.username AS seller_username
     FROM items
     LEFT JOIN accounts ON items.account_id = accounts.id
     WHERE items.id = ?
       AND datetime(items.created_time) >= datetime('now', '-7 days')`,
    [itemId],
    (err, item) => {
      if (err) return res.status(500).json({ error: 'Failed to load item' })

      db.all('SELECT * FROM comments WHERE item_id = ?', [itemId], (err2, comments) => {
        if (err2) return res.status(500).json({ error: 'Failed to load comments' })
        res.json({ item, comments })
      })
    },
  )
});

app.get('/all-items', (req, res) => {
  db.all(
    `SELECT items.*, accounts.username AS seller_username
     FROM items
     LEFT JOIN accounts ON items.account_id = accounts.id
     WHERE datetime(items.created_time) >= datetime('now', '-7 days')
     ORDER BY items.id DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to load items' })
      res.json(rows)
    },
  )
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email, and password are required' })
  }

  db.run(
    'INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      res.json({
        id: this.lastID,
        username,
        email,
      })
    },
  )
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    'SELECT id, username, email, password FROM accounts WHERE email = ?',
    [email],
    (err, user) => {
      if (err) return res.status(500).json({ error: 'Login failed' })
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
      })
    },
  )
});

app.get('/me/:id', (req, res) => {
  db.get(
    'SELECT id, username, email FROM accounts WHERE id = ?',
    [req.params.id],
    (err, user) => {
      if (err) return res.status(500).json({ error: 'Failed to load account' })
      if (!user) return res.status(404).json({ error: 'User not found' })
      res.json(user)
    },
  )
});

app.get('/favourites/:accountId', (req, res) => {
  db.all(
    `SELECT items.*, accounts.username AS seller_username
     FROM favourites
     JOIN items ON favourites.item_id = items.id
     LEFT JOIN accounts ON items.account_id = accounts.id
     WHERE favourites.account_id = ?
       AND datetime(items.created_time) >= datetime('now', '-7 days')
     ORDER BY favourites.id DESC`,
    [req.params.accountId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to load favourites' })
      res.json(rows)
    },
  )
});

app.post('/favourites', (req, res) => {
  const { account_id, item_id } = req.body

  if (!account_id || !item_id) {
    return res.status(400).json({ error: 'account_id and item_id are required' });
  }

  db.run(
    'INSERT OR IGNORE INTO favourites (account_id, item_id) VALUES (?, ?)',
    [account_id, item_id],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to favourite item' })
      res.json({ success: true })
    },
  )
});

app.delete('/favourites/:accountId/:itemId', (req, res) => {
  const { accountId, itemId } = req.params;

  db.run(
    'DELETE FROM favourites WHERE account_id = ? AND item_id = ?',
    [accountId, itemId],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to remove favourite' })
      res.json({ success: true })
    },
  )
});

app.post('/items', upload.single('image'), (req, res) => {
  const { name, price, description, country, account_id } = req.body;
  let image_url = null;

  if (req.file) {
    image_url = `/uploads/${req.file.filename}`;
  }

  const csvRow = `${name},${price},${country}\n`
  fs.appendFile('data/listings.csv', csvRow, (err) => {
    if (err) console.log('Failed to write to listings csv', err);
  })

  /*
    Used for understandning what toISOString returns:
    https://www.w3schools.com/jsref/jsref_toisostring.asp
  */
  const created_time = new Date().toISOString();

  db.run(
    'INSERT INTO items (name, price, description, image_url, country, account_id, created_time) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, price, description, image_url, country, account_id || null, created_time],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to create item' })

      res.json({
        id: this.lastID,
        name,
        price,
        description,
        image_url,
        country,
        account_id,
        created_time,
      })
    },
  )
});

app.post('/comments', (req, res) => {
  const { item_id, user, text } = req.body;

  db.run(
    'INSERT INTO comments (item_id, user, text) VALUES (?, ?, ?)',
    [item_id, user, text],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to save comment' })

      res.json({
        id: this.lastID,
        item_id,
        user,
        text,
      })
    },
  )
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
        average_rating: row?.average_rating || 0,
      })
    },
  )
})

app.post('/ratings', (req, res) => {
  const { item_id, user, rating } = req.body;
  const parsedRating = Number(rating);

  if (!item_id || !user || parsedRating < 1 || parsedRating > 5) {
    return res.status(400).json({ error: 'Valid item, user, and rating are required' });
  }

  db.run(
    'INSERT INTO ratings (item_id, user, rating) VALUES (?, ?, ?)',
    [item_id, user, parsedRating],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to save rating' });

      res.json({
        id: this.lastID,
        item_id,
        user,
        rating: parsedRating,
      })
    },
  )
});

app.delete('/items/:itemId/:accountId', (req, res) => {
  const { itemId, accountId } = req.params;

  db.get(
    'SELECT * FROM items WHERE id = ?',
    [itemId],
    (err, item) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to load item' });
      }

      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      if (String(item.account_id) !== String(accountId)) {
        return res.status(403).json({ error: 'You can only delete your own posts' });
      }

      db.run(
        'DELETE FROM items WHERE id = ?',
        [itemId],
        function (deleteErr) {
          if (deleteErr) {
            return res.status(500).json({ error: 'Failed to delete item' });
          }

          res.json({ success: true })
        },
      )
    },
  )
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})