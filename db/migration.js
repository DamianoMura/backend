const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;
const mysql = require("mysql2");
const createTables = require("./seeder/nerdNest_ER_db");

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  ssl: { rejectUnauthorized: false }
});

connection.connect((err) => {
  if (err) {
    console.error("Connection error", err);
    process.exit(1);
  }
  console.log(`Connected to ${DB_NAME}`);
  console.log(`Creating tables...`);
  createTables(connection);
});
