const sqlite3 = require('sqlite3').verbose();
module.exports = db;


const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Create SQLite3 database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// Create tables if they do not exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    address TEXT,
    phone TEXT,
    city TEXT,
    state TEXT,
    password TEXT
)`);

    db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    description TEXT
)`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
)`);
});
