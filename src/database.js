const mysql = require('mysql');

const {promisify} = require('util');

const {database}= require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error("Se cerró la conexión con la base de datos");
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene demasiadas conexiones simultáneas');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('La conexión con la base de datos fue rechazada');
        }
    }
    if(connection) connection.release();
    console.log('Conectado con la base de datos.');
    return;
});
//Promisify para querys : convertimos callbacks a promesas
pool.query = promisify(pool.query);

module.exports = pool;