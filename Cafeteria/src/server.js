const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa o pacote CORS
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Usa o middleware CORS
app.use(express.json());

// Rotas
app.get('/api/menu', (req, res) => {
    res.json([
        { id: 1, name: 'Café coado', price: 15.99 },
        { id: 2, name: 'Café espresso', price: 18.99 }
    ]);
});

app.get('/produtos', (req, res) => {
    // Lógica para obter produtos
    res.json([{ id: 1, nome: 'Café', preco: 10.00 }]);
});

app.post('/produtos', (req, res) => {
    // Lógica para criar um novo produto
    const produto = req.body;
    res.status(201).json(produto);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
