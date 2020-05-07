/*
    Passo 1
        Digitar 'yarn' no terminal
        - Vai instalar todas as dependencias requisitadas no package.json;

    Passo 2
        Digitar 'yarn dev' no terminal
        - Vai iniciar a atualização automatica no servidor conforme a atualização do documento JS;

    Passo 3
        Criar uma variável Array de objetos com alguns dados;

    Passo 4
        Criar todos os métodos de requisições HTTP;
            GET     - Le uma determinada resposta;
            POST    - Inserir um objeto novo;
            PUT     - Edita um dos objetos;
            DELETE  - Exclui do Array de objetos, um objeto;
    
    Passo 5 
        Digitar 'yarn add pg' no terminal 
        - Vai instalar as dependencias necessárias para usar as bibliotecas do Postgres;
    
    Passo 6
        Crie o arquivo 'database.js';
        Vá para ele;
*/

// Constante que requisita a biblioteca express
const express = require('express');

// Constante que instancia as funções HTTP da biblioteca express
const server = express();

// Array de lista de clientes 
var clientes = [
    {
        id: 1,
        nome: 'Juan Domenick',
        email: 'juandomenick12@gmail.com',
        telefone: '(17) 99264-1760',

    },
    {
        id: 2,
        nome: 'Ramon Domenick',
        email: 'ramondfernandes@gmail.com',
        telefone: '(17) 99265-0000',

    },
    {
        id: 3,
        nome: 'André Lomba',
        email: 'landrelomba@gmail.com',
        telefone: '(17) 99115-9999',

    },
    {
        id: 4,
        nome: 'Jean Zago',
        email: 'jeancarlosramos@gmail.com',
        telefone: '(17) 99255-6487',

    },
    {
        id: 5,
        nome: 'Pedro Carlos',
        email: 'zagootacu@gmail.com',
        telefone: '(17) 4002-8922',

    },
];

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

// Array de Arrays que armazena os outros dois Arrays 
var todos = [
    {
        clientes: clientes,
    },
    
    {
        produtos:produtos
    }
];

/* 
* GET
* home - Lista todos os links das outras requisições GET
* 
* return HTML
*/
server.get('/', (req, res) => {

    return res.send(`
    <h3>Bem vindo ao projeto de LP3</h3>
    <br>
    <p>Selecione o que voce procura:</p>
    <p>Memória Volátil;</p>
    <ul>
        <li><a href='/clientes'>Clientes</a></li>
        <li><a href='/produtos'>Produtos</a></li>
        <li><a href='/todos'>Todos</a></li>
    </ul>
    <p>Banco de Dados;</p>
    <ul>
        <li><a href='/bd/clientes'>Clientes</a></li>
        <li><a href='/bd/produtos'>Produtos</a></li>
        <li><a href='/bd/todos'>Todos</a></li>
    </ul>
    <footer>
        <p>Powered by: Juan Domenick</p>
    </footer>
    `);
})

/* 
* GET
* /clientes - Lista todos os dados do array de clientes
* 
* return JSON
*/
server.get('/clientes', (req, res) => {
    return res.json(clientes);
})

/* 
* GET
* /produtos - Lista todos os dados do array de produtos
* 
* return JSON
*/
server.get('/produtos', (req, res) => {
    return res.json(produtos);
})

/* 
* GET
* /todos - Lista todos os dados do array de arrays de dados
* 
* return JSON
*/
server.get('/todos', (req, res) => {
    return res.json(todos);
})


server.get('/clientes/:id', (req, res) => {
    const id = req.params.id;

    const cliente = clientes.filter(p => p.id == id);

    return res.json(cliente);   
})

server.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const produto = produtos.filter(p => p.id == id);

    return res.json(produto);   
})

server.post('/clientes', (req, res) => {
    const cliente = req.body;

    clientes.push(cliente);

    return res.status(201).send();
})

server.post('/produtos', (req, res) => {
    const produto = req.body;

    produtos.push(produto);

    return res.status(201).send();
})

server.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    
    clientes = clientes.filter(p => p.id != id);

    return res.status(200).send()
})

server.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const produto = req.body;

    clientes.forEach(p => {

        if(p.id == id){
            p.nome = produto.nome;
            p.preco = produto.preco;
            return;
        }
    })

    return res.send();
})

server.listen(process.env.PORT || 3000);