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

const sql_insert_cliente = `
        INSERT INTO clientes
            VALUES
                ('Juan Domenick', 'juan@raizessolucoes.com.br', '3236-4156'),
                ('André Bento', 'andre@raizessolucoes.com.br', '4002-8922')
`;