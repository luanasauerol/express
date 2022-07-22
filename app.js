const express = require('express');
// import express from 'express';

// const server = express();
const app = express();

// primeiro parâmetro ('/') URL da rota
// segundo parâmetro  callback com dois parâmetros ((req,res))
app.get('/', (req, res) => {
    res.send('Hello World!');

    // em caso de erro, podemos redirecionar o usuário para uma página de erro
    // res.redirect('/erro');
})

app.listen(3000, () => {
    console.log('Servidor em execução');
});