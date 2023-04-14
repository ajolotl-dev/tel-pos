const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'gympos',
})

function getConnection(){
    return connection;
}

module.exports = { getConnection }