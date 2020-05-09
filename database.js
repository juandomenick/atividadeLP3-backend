/*
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
*/

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

// const sql_create_table_clientes = `
//     CREATE TABLE IF NOT EXISTS clientes
//     (
//         id serial primary key,
//         nome varchar(255) null,
//         email varchar(255) null,
//         telefone varchar(255) null

//     )
// `;

// pool.query(sql_create_table_clientes, (error, result) => {
//     if(error)
//         throw error
    
//     console.log('Tabela criada com sucesso!');
// })

// /* 
// * GET
// * /pratos - Lista todos os pratos do banco de dados
// * 
// * data bd
// * return JSON
// */
// server.get('/pratos', async (request, response) => {
//     const result = await pool.query('SELECT * FROM pratos')
//     return response.json(result.rows);
// })


// /* 
// * GET
// * /pratos/:id - Mostra o prato passado por parametro do Banco de dados
// * 
// * param INT :id
// * data BD
// * return JSON
// */
// server.get('/pratos/:id', async (request, response) => {

//     // Dados passado como parametro
//     var id = request.params.id;

//     // Comando SQL 
//     let sql = 'SELECT * FROM pratos p WHERE p.id = $1';

//     // Executa passando o comando do SQL e o dados necessários
//     var result = await pool.query(sql, [id]);

//     return response.json(result.rows);   
// })


// /* 
// * POST
// * /pratos- Cria um novo prato no banco de dados
// * 
// * data BD
// * return status
// */
// server.post('/pratos', async (request, response) => {

//     // Dados passado no body da requisição 
//     var nome  = request.body.nome;
//     var tipo  = request.body.tipo;
//     var preco = request.body.preco;

//     // Comando SQL 
//     let sql = 'INSERT INTO pratos (nome, tipo, preco) VALUES ($1, $2, $3)';

//     // Executa passando o comando do SQL e o dados necessários
//     var result = await pool.query(sql, [nome, tipo, preco]);

//     return response.status(200).send();
// })


// /* 
// * DELETE
// * /pratos/:id - Deleta o prato passado por parametro do Banco de dados
// * 
// * param INT :id
// * data BD
// * return JSON
// */
// server.delete('/pratos/:id', async (request, response) => {

//     // Dados passado como parametro
//     var id = request.params.id;

//     // Comando SQL 
//     let sql = 'DELETE FROM pratos p WHERE p.id = $1';

//     // Executa passando o comando do SQL e o dados necessários
//     var result = await pool.query(sql, [id]);

//     return response.status(200).send();   
// })


// /* 
// * PUT
// * /pratos/:id - Edita o prato passado por parametro do Banco de Dados
// * 
// * param INT :id
// * data BD
// * return status
// */
// server.put('/pratos/:id', async (request, response) => {

//     // Dados passado como parametro
//     var id = request.params.id;

//     // Dados passado no body da requisição 
//     var nome  = request.body.nome;
//     var tipo  = request.body.tipo;
//     var preco = request.body.preco;

//     // Comando SQL 
//     let sql = 'UPDATE pratos SET nome = $1, tipo = $2, preco = $3 WHERE id = $4'

//     // Executa passando o comando do SQL e o dados necessários
//     var result = await pool.query(sql, [nome, tipo, preco, id]);

//     return response.status(200).send();
// })