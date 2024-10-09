const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/carrinho', (req, res) => {
    const { produto_id, quantidade } = req.body;

    if (!produto_id || !quantidade) {
        return res.status(400).json({ error: 'Produto e quantidade são obrigatórios' });
    }

    const query = `INSERT INTO carrinho (produto_id, quantidade) VALUES (?, ?)`;
    db.run(query, [produto_id, quantidade], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, produto_id, quantidade });
    });
});

router.get('/carrinho', (req, res) => {
    const query = `
      SELECT c.id, p.nome, p.preco, c.quantidade, (p.preco * c.quantidade) AS total
        FROM carrinho c
        JOIN produtos p ON c.produto_id = p.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

router.post('/checkout', (req, res) => {
    // Aqui podemos adicionar lógica para processar pagamento, etc.
    // Por agora, apenas vamos limpar o carrinho.

    db.run(`DELETE FROM carrinho`, [], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Compra finalizada com sucesso!' });
    });
});


module.exports = router;
