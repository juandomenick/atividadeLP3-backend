/*
*   Passo 1
*       Digitar 'yarn' no terminal
*       - Vai instalar todas as dependencias requisitadas no package.json;
*
*   Passo 2
*       Digitar 'yarn dev' no terminal
*       - Vai iniciar a atualização automatica no servidor conforme a atualização do documento JS;
*
*   Passo 3
*       Criar uma variável Array de objetos com alguns dados;
*
*   Passo 4
*       Criar todos os métodos de requisições HTTP;
*           GET     - Le uma determinada resposta;
*           POST    - Inserir um objeto novo;
*           PUT     - Edita um dos objetos;
*           DELETE  - Exclui do Array de objetos, um objeto;
*   
*   Passo 5 
*       Digitar 'yarn add pg' no terminal 
*       - Vai instalar as dependencias necessárias para usar as bibliotecas do Postgres;
*   
*   Passo 6
*       Crie o arquivo 'database.js' para praticar os métodos de BD caso queira
*   
*   Passo 7
*       Instanciar a constante Pool "const Pool = require('pg').Pool";
*       Essa constante Pool gerencia e controla todas as requisições de conexão com o Banco de Dados;
*
*   Passo 8
*       Instanciar a constante pool
*       Essa constante pool gerencia e controla a conexão com o Banco;
*       Ela armazena todas as informações necessárias para conectar no banco
*           ou seja, todas as requisições feitas (SELECT, INSERT, UPDATE, DELETE, etc...) precisam ser feitas conexões ao banco
*           e para isso é necessário em todas as vezes fazer essa validação no banco, como se fosse varios logins;
*
*   Passo 9 
*       Criar os metodos usando a function 'query' de pool (SELECT, INSERT, UPDATE, DELETE)
*       - sql_create_table_pratos ( SQL que cria a tabela 'pratos' que eu escolhi para atividade)
*
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

// Array de lista de tipos
// Variavel que será utilizada para manipulação de dados voláteis
var tipos = [
    {
        id: 1,
        nome: 'Lanches'

    },
    {
        id: 2,
        nome: 'Massas'

    },
    {
        id: 3,
        nome: 'Pizzas'

    },
];


// Sql de criação da tabela de pratos no BD
const sql_create_table_pratos = `
    CREATE TABLE IF NOT EXISTS pratos
    (
        id serial primary key,
        nome varchar(255) null,
        tipo varchar(255) null,
        preco float(11) null

    )
`;
pool.query(sql_create_table_pratos, (error, result) => {
    if(error)
        throw error
    
    console.log('Tabela criada com sucesso!');
})

// Sql de exclusão da tabela de pratos no BD
// const sql_DROP_table_pratos = `
//     DROP TABLE pratos
// `;
// pool.query(sql_DROP_table_pratos, (error, result) => {
//     if(error)
//         throw error
    
//     console.log('Tabela excluida com sucesso!');
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
    <h3>Menu de Lanchonete</h3>
    <p>Selecione o que voce procura:</p>
    <p>Memória Volátil; (Dados armazenado num Array)</p>
    <ul>
        <li><a href='/tipos'>Tipos de Pratos</a></li>
    </ul>
    <p>Banco de Dados; (Dados salvos no banco de dados Heroku)</p>
    <ul>
        <li><a href='/bd/pratos'>Pratos</a></li>
    </ul>
    <footer>
        <p>Powered by: Juan Domenick</p>
    </footer>
    `);
})


/* 
* GET
* /tipos - Lista todos os tipos do array de tipos
* 
* data local
* return JSON
*/
server.get('/tipos', (request, response) => {
    return response.json(tipos);
})


/* 
* GET
* /pratos - Lista todos os pratos do banco de dados
* 
* data BD
* return JSON
*/
server.get('/pratos', async (request, response) => {
    const result = await pool.query('SELECT * FROM pratos');
    return response.json(result.rows);
})


/* 
* GET
* /tipos/:id - Mostra o tipo passado por parametro do Array
* 
* param INT :id
* data local
* return JSON
*/
server.get('/tipos/:id', (req, res) => {
    const id = req.params.id;

    const tipo = tipos.filter(p => p.id == id);

    return res.json(tipos);   
})


/* 
* GET
* /pratos/:id - Mostra o prato passado por parametro do Banco de dados
* 
* param INT :id
* data BD
* return JSON
*/
server.get('/pratos/:id', (req, res) => {
    const id = req.params.id;

    const prato = pratos.filter(p => p.id == id);

    return res.json(prato);   
})


/* 
* POST
* /tipos- Cria um novo tipo no Array de tipos
* 
* data local
* return status
*/
server.post('/tipos', (req, res) => {
    const tipo = req.body;

    tipos.push(tipo);

    return res.status(201).send();
})

server.post('/bd/clientes', (req, res) => {
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

})


// server.delete('/clientes/:id', (req, res) => {
//     const id = req.params.id;
    
//     clientes = clientes.filter(p => p.id != id);

//     return res.status(200).send()
// })

// server.put('/clientes/:id', (req, res) => {
//     const id = req.params.id;
//     const produto = req.body;

//     clientes.forEach(p => {

//         if(p.id == id){
//             p.nome = produto.nome;
//             p.preco = produto.preco;
//             return;
//         }
//     })

//     return res.send();
// })

server.listen(process.env.PORT || 3000);