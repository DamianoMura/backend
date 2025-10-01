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
  console.log("(db.js)Connected!");
  connection.query(`CREATE DATABASE ${DB_NAME}`, function (err, result) {
    if (err) {
      connection.database=DB_NAME;
      console.log("DB already exists... proceed to connect....",connection.database)
    }
    else {
      //here we have created the new db so we need to create also all tables 
      console.log("Database created");
      connection.database=DB_NAME;
      console.log(`connecting to database ${DB_NAME}`)
      generate();
    }
  });
});

module.exports = connection;