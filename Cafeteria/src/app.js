
// Register
app.post('/register', (req, res) => {
    const { name, email, address, phone, city, state, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err.message });

        const stmt = db.prepare('INSERT INTO users (name, email, address, phone, city, state, password) VALUES (?, ?, ?, ?, ?, ?, ?)');
        stmt.run(name, email, address, phone, city, state, hashedPassword, function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        });
        stmt.finalize();
    });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(401).json({ error: 'Invalid credentials' });

        bcrypt.compare(password, row.password, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!result) return res.status(401).json({ error: 'Invalid credentials' });

            res.status(200).json({ id: row.id });
        });
    });
});

// Add product
app.post('/add-product', (req, res) => {
    const { name, price, description } = req.body;
    const stmt = db.prepare('INSERT INTO products (name, price, description) VALUES (?, ?, ?)');
    stmt.run(name, price, description, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
    stmt.finalize();
});

// Get products
app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
});

// Order
app.post('/order', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    const stmt = db.prepare('INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)');
    stmt.run(user_id, product_id, quantity, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
    stmt.finalize();
});

// Get orders by user
app.get('/orders/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all('SELECT * FROM orders WHERE user_id = ?', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
});

// Get order details
app.get('/order/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    db.get('SELECT * FROM orders WHERE id = ?', [orderId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Order not found' });
        res.status(200).json(row);
    });
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
