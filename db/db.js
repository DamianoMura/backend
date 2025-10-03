const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")

//if database don't exists cteate it




//queries used to create the db:

let connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD
})

const generate = require('./nerdNest_ER_db');

connection.connect((err)=> {

});

module.exports = connection;