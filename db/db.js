const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")
//we create the connection
  let connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PWD,
    database: DB_NAME
  })
  //connect to the database
  connection.connect((err)=> {
    if(err) throw err;
    console.log(`DB connected as ${connection.config.host}:${connection.config.port} db: ${connection.config.database}`);
  });

module.exports = connection;