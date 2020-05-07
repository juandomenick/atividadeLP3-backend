const express = require('express');

const server = express();

// Array de lista de produtos 
var produtos = [
    {
        id:1,
        nome: 'Computador',
        preco: 1200.20
    },
    {
        id:2,
        nome:'Mouse',
        preco: 20.50
    },
    {
        id:3,
        nome:'Teclado',
        preco: 75.50
    },
    {
        id:4,
        nome:'Monitor',
        preco: 292.50
    },
];

// // Middlewares
// server.use(express.json())

server.get('/produtos', (req, res) => {
    return res.json(produtos);
})

server.get('/', (req, res) => {
    return res.send('Hello World !');
})

server.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const produto = produtos.filter(p => p.id == id);

    return res.json(produto);   
})

server.post('/produtos', (req, res) => {
    const produto = req.body;

    produtos.push(produto);

    return res.status(201).send();
})

server.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;
    
    produtos = produtos.filter(p => p.id != id);

    return res.status(200).send()
})

server.put('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const produto = req.body;

    produtos.forEach(p => {

        if(p.id == id){
            p.nome = produto.nome;
            p.preco = produto.preco;
            return;
        }
    })

    return res.send();
})

server.listen(process.env.PORT || 3000);