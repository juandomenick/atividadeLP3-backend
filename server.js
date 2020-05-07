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
        Crie o arquivo 'database.js' para praticar os métodos de BD caso queira
    
    Passo 7
        Instanciar a constante Pool "const Pool = require('pg').Pool";
        Essa constante Pool gerencia e controla todas as requisições de conexão com o Banco de Dados;

    Passo 8
        Instanciar a constante pool
        Essa constante pool gerencia e controla a conexão com o Banco;
        Ela armazena todas as informações necessárias para conectar no banco
            ou seja, todas as requisições feitas (SELECT, INSERT, UPDATE, DELETE, etc...) precisam ser feitas conexões ao banco
            e para isso é necessário em todas as vezes fazer essa validação no banco, como se fosse varios logins;

    Passo 9 
        Criar os metodos usando a function 'query' de pool (SELECT, INSERT, UPDATE, DELETE)
        - sql_create_table_clientes ( SQL que cria a tabela 'clientes' que eu escolhi para atividade)

*/

const express = require('express');

const server = express();

const Pool = require('pg').Pool

const pool = new Pool({

    user: 'fvlntcvvnbveww',
    password: '6d9eae92de5b88f3e9f7e7917c67a691e29fe0f01dc66b6afad6101161710f3c',
    host: 'ec2-34-204-22-76.compute-1.amazonaws.com',
    database: 'dbnjb43q0fn0s1',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }

})

// Array de lista de clientes
// Variavel que será utilizada para manipulação de dados voláteis
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

// Sql de criação da tabela de clientes no BD
const sql_create_table_clientes = `
    CREATE TABLE IF NOT EXISTS clientes
    (
        id serial primary key,
        nome varchar(255) null,
        email varchar(255) null,
        telefone varchar(255) null

    )
`;

pool.query(sql_create_table_clientes, (error, result) => {
    if(error)
        throw error
    
    console.log('Tabela criada com sucesso!');
})

// Sql de inserção de cliente
const sql_insert_cliente = `
        INSERT INTO clientes
            VALUES
                ('Juan Domenick', 'juan@raizessolucoes.com.br', '3236-4156'),
                ('André Bento', 'andre@raizessolucoes.com.br', '4002-8922')
`;

// pool.query(sql_insert_cliente, (error, result) => {
//     if(error)
//         throw error
    
//     console.log('Tabela criada com sucesso!');
// })

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
    </ul>
    <p>Banco de Dados;</p>
    <ul>
        <li><a href='/bd/clientes'>Clientes</a></li>
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
* data local
* return JSON
*/
server.get('/clientes', (req, res) => {
    return res.json(clientes);
})

/* 
* GET
* /clientes - Lista todos os dados do array de clientes
* 
* data BD
* return JSON
*/
server.get('/bd/clientes', (req, res) => {
    return res.json(clientes);
})


/* 
* POST
* /todos - Lista todos os dados do array de arrays de dados
* 
* return JSON
*/
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