const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")
//queries used to create the db:

let connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  
})

const generate = require('./nerdNest_ER_db');

connection.connect(function(err) {
  if (err) throw err;
 
  connection.query(`CREATE DATABASE ${DB_NAME}`, function (err) {
    if (err) {
      console.log("database already exists",err.code)
      
    }
    else {
      //here we have created the new db so we need to create also all tables 
      console.log(`Database : ${DB_NAME} created`);
      //function from nerNest_db.js
      generate();
      
      
    }
  });
});

connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database : DB_NAME
})
connection.connect((err)=>{
  if (err) console.log("connection error",err.code)
  console.log("connection established")
})
module.exports = connection;