// const connection = require("../db/db.js");

const { DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME } = process.env;
//we import mysql2 modules
const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PWD,
	database: DB_NAME,
});

connection.connect((err) => {
	if (err) throw err;
	console.log(
		`mysql connected to ${connection.config.host}:${connection.config.port}/${connection.config.database}`
	);
});

// Index: returning discount_codes
const index = (req, res) => {
	const sql = "SELECT * FROM discount_codes";
	connection.query(sql, (err, results) => {
		if (err)
			return res.status(500).json({ error: "Query execution error: " + err });
		res.json(results);
	});
};

// Show: returning single discount_codes
const show = (req, res) => {
	const { id } = req.params;
	const sql = "SELECT * FROM discount_codes WHERE code_id = ?";
	connection.query(sql, [id], (err, results) => {
		if (err)
			return res.status(500).json({ error: "Query execution error: " + err });
		if (results.length === 0)
			return res.status(404).json({ error: "Discount code not found!" });
		res.json(results[0]);
	});
};

// Create: adding new discount_codes
const create = (req, res) => {
	const { code, discount_percent, valid_from, valid_until } = req.body;
	
	const sql =
		"INSERT INTO discount_codes (code, discount_percent, valid_from, valid_until) VALUES (?, ?, ?, ?)";
	connection.query(
		sql,
		[code, discount_percent, valid_from, valid_until],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Discount code Insert error: " + err });
			res.status(201).json({
				id: result.insertId,
				code,
				discount_percent,
				valid_from,
				valid_until,
			});
		}
	);
};

// Update: updating existing discount_codes
const update = (req, res) => {
	const { id } = req.params;
	const { code, discount_percent, valid_from, valid_until } = req.body;
	const sql =
		"UPDATE categories SET code = ?, discount_percent = ?, valid_from = ?, valid_until = ? WHERE code_id = ?";
	connection.query(
		sql,
		[code, discount_percent, valid_from, valid_until, id],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Discount code Update error: " + err });
			if (result.affectedRows === 0)
				return res.status(404).json({ error: "Discount code not found!" });
			res.json({ id, code, discount_percent, valid_from, valid_until });
		}
	);
};

// Destroy: delete single discount_codes
const destroy = (req, res) => {
	const { id } = req.params;
	const sql = "DELETE FROM discount_codes WHERE code_id = ?";
	connection.query(sql, [id], (err, result) => {
		if (err)
			return res
				.status(500)
				.json({ error: "Discount code Delete error: " + err });
		if (result.affectedRows === 0)
			return res.status(404).json({ error: "Discount code not found!" });
		res.sendStatus(204);
	});
};

module.exports = {
	index,
	show,
	create,
	update,
	destroy,
};
