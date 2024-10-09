const request = require('supertest');
const app = require('../app');

test('Deve criar um novo produto', async () => {
    const response = await request(app)
        .post('/api/produtos')
        .send({ nome: 'Produto Teste', preco: 100 });
    expect(response.statusCode).toBe(201);
    expect(response.body.nome).toBe('Produto Teste');
});

// Adicione testes para Read, Update e Delete aqui
