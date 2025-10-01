const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")
//queries used to create the db:

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  
})

const generate = require('./nerdNest_ER_db');

connection.connect(function(err) {
  if (err) throw err;
  console.log(`mysql connected to ${DB_HOST}:${DB_PORT}`);
  connection.query(`CREATE DATABASE ${DB_NAME}`, function (err, result) {
    if (err) {
      connection.config.database=DB_NAME;//setting the database name 
      console.log("connecting to database ",connection.config.database)
      
    }
    else {
      //here we have created the new db so we need to create also all tables 
      console.log(`Database : ${DB_NAME} created`);
      //function from nerNest_db.js
      generate();
    }
  });
});

module.exports = connection;