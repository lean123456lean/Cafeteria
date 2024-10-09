const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (email, senha) => {
    const user = await User.findByEmail(email);
    if (!user || user.senha !== senha) throw new Error('Credenciais inválidas');
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return token;
};

// Adicione funções para registro e outras ações de autenticação
