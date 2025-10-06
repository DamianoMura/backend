const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;
const mysql = require("mysql2");
const createTables = require("./nerdNest_ER_db");
// Initial connection (no database selected yet)
const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD, 
});


// Ensure database exists and select it, then allow queries

  connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``, function (err) {
    if (err) throw err;
    connection.changeUser({ database: DB_NAME }, (err) => {
      if (err) throw err;
      console.log(`MySQL connected to ${connection.config.host}:${connection.config.port}/${DB_NAME}`);
      createTables();
    });
  });

// Sequenza: connessione -> creazione DB -> creazione tabelle -> avvio server



