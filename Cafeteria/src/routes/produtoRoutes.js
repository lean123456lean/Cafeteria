const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/produtos', produtoController.createProduto);
// Adicione rotas para Read, Update e Delete aqui

module.exports = router;
