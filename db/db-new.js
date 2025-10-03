const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")
//queries used to create the db:

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD
})

connection.connect((err)=>{
  if(err) throw err;
  console.log(`mysql connected to ${connection.config.host}:${connection.config.port}/${connection.config.database}`);
});
//connessione creata

module.exports = connection;  