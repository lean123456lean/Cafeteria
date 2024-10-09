fetch('http://localhost:3000/produtos')
    .then(response => response.json())
    .then(data => {
        const produtosContainer = document.getElementById('produtos');
        data.forEach(produto => {
            const produtoElement = document.createElement('div');
            produtoElement.textContent = `${produto.nome} - R$ ${produto.preco}`;
            produtosContainer.appendChild(produtoElement);
        });
    })
    .catch(error => console.error('Erro:', error));

function adicionarAoCarrinho(produtoId, quantidade) {
    fetch('http://localhost:3000/carrinho', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ produto_id: produtoId, quantidade })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto adicionado ao carrinho:', data);
        })
        .catch(error => console.error('Erro:', error));
}

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

    db.run(`DELETE FROM carrinho`, [], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Compra finalizada com sucesso!' });
    });
});


function listarCarrinho() {
    fetch('http://localhost:3000/carrinho')
        .then(response => response.json())
        .then(data => {
            const carrinhoContainer = document.getElementById('carrinho');
            carrinhoContainer.innerHTML = ''; // Limpar conteúdo anterior
            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.textContent = `${item.nome} - Quantidade: ${item.quantidade} - Total: R$ ${item.total}`;
                carrinhoContainer.appendChild(itemElement);
            });
        })
        .catch(error => console.error('Erro:', error));
}


function finalizarCompra() {
    fetch('http://localhost:3000/checkout', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            listarCarrinho(); // Atualizar o carrinho para mostrar que foi esvaziado
        })
        .catch(error => console.error('Erro:', error));
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Item adicionado ao carrinho!');
    });
});


fetch('http://localhost:3000/api/menu')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Erro:', error));



//Usado para teste da api no navegador
/*    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste API</title>
</head>
<body>
    <h1>Teste da API</h1>
    <button id="getProdutos">Buscar Produtos</button>
    <pre id="response"></pre>

    <script>
        document.getElementById('getProdutos').addEventListener('click', () => {
            fetch('http://localhost:3000/produtos')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('response').textContent = JSON.stringify(data, null, 2);
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        });
    </script>
</body>
</html> */
