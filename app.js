const express = require('express');
const app = express();
let produtos = require('./produtos');

app.use(express.json());

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/produtos', (req, res) => {
    const content = req.body;
    produtos = [...produtos, ...content];
    res.status(201).json(produtos);
});

app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;
    const produtoEncontrado = produtos.find((produto) => produto.id === id);

    if (!produtoEncontrado) {
        return res.status(400).json({ "message": "Produto não encontrado" });
    }
    const produtoAtualizado = produtos.map((produto) => {
        if (produto.id === id) {
            return content;
        }
        return produto;
    })
    produtos = produtoAtualizado;
    res.status(200).json(produtos);

});


app.delete('/produtos/:id', (req, res)=>{
    const id = Number(req.params.id);
    const produtoEncontrado = produtos.find((produto) => produto.id === id);
    if (!produtoEncontrado) {
        return res.status(400).json({ "message": "Produto não encontrado" });
    }

    produtos = produtos.filter((produto)=>produto.id !== id);
    res.status(200).json(produtos);
});

app.listen(3001, () => {
    console.log('Servidor em execução');
});