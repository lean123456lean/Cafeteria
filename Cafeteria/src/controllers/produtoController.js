const Produto = require('../models/produto');

exports.createProduto = async (req, res) => {
    const { nome, preco } = req.body;
    try {
        const produto = await Produto.create({ nome, preco });
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Adicione as funções para Read, Update e Delete aqui
