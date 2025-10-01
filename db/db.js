const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")
const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME

})

connection.connect((err)=>{
  if(err) throw err;
  console.log(`connected to db server ${DB_NAME}`);
});

module.exports = connection;