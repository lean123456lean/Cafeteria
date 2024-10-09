const Joi = require('joi');

const produtoSchema = Joi.object({
    nome: Joi.string().required(),
    preco: Joi.number().required()
});

module.exports = { produtoSchema };
