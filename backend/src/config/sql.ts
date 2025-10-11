import mysql from "mysql2/promise";

export const conexao = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: '', //TODO colocar nome database
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
