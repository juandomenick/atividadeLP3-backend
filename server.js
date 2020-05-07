/*
    Passo 1
        Digitar 'yarn' no terminal
        - Vai instalar todas as dependencias requisitadas no package.json

    Passo 2
        Digitar 'yarn dev' no terminal
        - Vai iniciar a atualização automatica no servidor conforme a atualização do documento JS

    Passo 3
        Criar uma variável Array de objetos com alguns dados 

    Passo 4
        Criar todos os métodos de requisições HTTP
        GET - Le uma determinada resposta
        POST - Inserir um objeto novo
        UPDATE - Edita um dos objetos
        DELETE - Exclui do Array de objetos, um objeto
*/

const express = require('express');

const server = express();

// Array de lista de produtos 
var clientes = [
    {
        id: 1,
        nome: 'Computador',
        preco: 1200.20
    }
];


server.get('/produtos', (req, res) => {
    return res.json(produtos);
})

server.get('/', (req, res) => {
    return res.send('Pedro gay kkkkk !');
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