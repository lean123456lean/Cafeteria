const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const criarTabela = () => {
    db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL
  )`);
};

criarTabela();

module.exports = {
    create: (produto) => {
        return new Promise((resolve, reject) => {
            const { nome, preco } = produto;
            db.run('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco], function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID, ...produto });
            });
        });
    },
    // Adicione métodos para Read, Update e Delete aqui
};
