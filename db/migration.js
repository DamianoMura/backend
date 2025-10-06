const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;
const mysql = require("mysql2");
const createTables = require("./seeder/nerdNest_ER_db");
// Initial connection (no database selected yet)
const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD, 
});
function createDB(){
  connection.query(`CREATE DATABASE \`${DB_NAME}\`;`, (err) => {    
        if (err) {
          console.error("Database creation error", err);
        } else {    
          console.log(`Database ${DB_NAME} created.`);
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

  connection.query(`SHOW DATABASES LIKE ?;`  ,[DB_NAME], (err, results) => {
    if (err) {
      console.error("Error checking database existence", err);
      
    }   
    else if(results.length>0){
      console.log(`Database ${DB_NAME} already exists.`);
      console.log(`dropping database ${DB_NAME}`);
      connection.query(`DROP DATABASE \`${DB_NAME}\`;`, (err) => {    
        if (err) {
          console.error("Database drop error", err);
        } else {    
          console.log(`Database ${DB_NAME} dropped.`);
          createDB();
        } 
      });
    }
    else {
      createDB();
           
    }
  });


// // Connect to MySQL server
// connection.connect((err) => {
//   if (err) {
//     console.error("Connection error", err);
    
//   }
//   else {
//     console.log(`MySQL connected to ${connection.config.host}:${connection.config.port}`);
//     // Create the database if it doesn't exist
//     connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`, (err) => {
//       if (err) {
//         console.error("Database creation error", err);
//       } else {
//         console.log(`Database ${DB_NAME} is ready.`);
//         // Switch to the newly created database
//         connection.changeUser({ database: DB_NAME }, (err) => {
//           if (err) {  
//             console.error("Error in changing database", err);
//           } else {
//             console.log(`Using database ${DB_NAME}`);
//             console.log(`CREATING TABLES FOR ${DB_NAME}...`);
//             createTables(connection);

//           }
//         });
//       }
//     });
//   }
// });      
// Sequenza: connessione -> creazione DB -> creazione tabelle -> avvio server



