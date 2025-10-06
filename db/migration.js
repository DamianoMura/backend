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


connection.connect((err) => {
  if (err) {
    console.error("Connection error", err);
    
  }
  else {
    console.log(`MySQL connected to ${connection.config.host}:${connection.config.port}`);
    // Create the database if it doesn't exist
    connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`, (err) => {
      if (err) {
        console.error("Database creation error", err);
      } else {
        console.log(`Database ${DB_NAME} is ready.`);
        // Switch to the newly created database
        connection.changeUser({ database: DB_NAME }, (err) => {
          if (err) {  
            console.error("Error in changing database", err);
          } else {
            console.log(`Using database ${DB_NAME}`);
            console.log(`CREATING TABLES FOR ${DB_NAME}...`);
            createTables(connection);

          }
        });
      }
    });
  }
});      
// Sequenza: connessione -> creazione DB -> creazione tabelle -> avvio server



