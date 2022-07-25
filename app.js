const express = require('express');
const app = express();

// tem que ser antes dos métodos para podermos usar o formato JSON - ele traduz o body 
app.use(express.json());

const rotaProdutos = require('./routes/routeProducts'); 

app.use('/api/products', rotaProdutos); 

app.use((req,res,next)=>{
    res.status(404).send('Erro 404, not found');
    next();
});

app.listen(3001, () => {
    console.log('Servidor em execução');
});