const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;
const mysql = require("mysql2");

// Initial connection (no database selected yet)
const connection = mysql.createConnection({
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PWD,
	database: DB_NAME,
});

connection.connect((err) => {
	if (err) {
		console.error(
			`The Database ${DB_NAME} is not yet available: please run "npm run migration" and "npm run seed" to create and populate the database then restart the server.`
		);
		process.exit(1);
	} else {
		console.log(
			`MySQL connected to ${connection.config.host}:${connection.config.port}/${DB_NAME}`
		);
	}
});

module.exports = { connection };
