const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")
//queries used to create the db:

const db_connection = ( ) => {
  let connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PWD
  })
  connection.connect((err) => {
    if(err) connection=null;
  });
  
  return connection;
}

let conn=db_connection(); 
console.log(conn)