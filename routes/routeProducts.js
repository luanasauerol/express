const express = require('express');

const routes = express.Router();
let products = require('../products');


routes.get('/', (req, res) => {
    res.json(products);
});

routes.get('/:id/', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((produto) => produto.id === id)

    res.status(200).json(product);
});

function validatePrice(req, res, next) {
    const { price } = req.body;

    if (price && price >= 0) {
        return next();
    }

    return res.status(400).send('Produto com preço inválido')
}


routes.post('/', validatePrice, (req, res) => {
    const content = req.body;
    products = [...products, content];
    return res.status(201).json(products);
});

routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;
    const produtoEncontrado = products.find((produto) => produto.id === id);

    if (!produtoEncontrado) {
        return res.status(400).json({ "message": "Produto não encontrado" });
    }
    const produtoAtualizado = products.map((produto) => {
        if (produto.id === id) {
            return content;
        }
        return produto;
    })
    products = produtoAtualizado;
    res.status(200).json(products);

});


routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const produtoEncontrado = products.find((produto) => produto.id === id);
    if (!produtoEncontrado) {
        return res.status(400).json({ "message": "Produto não encontrado" });
    }

    products = products.filter((produto) => produto.id !== id);
    res.status(200).json(products);
});

module.exports = routes;