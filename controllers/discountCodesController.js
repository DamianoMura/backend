const { connection } = require("../db/db");

// Handler to get all discount_codes
const index = (req, res) => {
	connection.query("SELECT * FROM discount_codes", (err, results) => {
		if (err)
			return res.status(500).json({ error: "Query failed", details: err });
		res.status(200).json(results);
	});
};

// Handler to get a single discount_code by id
const show = (req, res) => {
	const { id } = req.params;
	connection.query(
		"SELECT * FROM discount_codes WHERE code_id = ?",
		[id],
		(err, results) => {
			if (err)
				return res.status(500).json({ error: "Query failed", details: err });
			if (!results.length)
				return res.status(404).json({ error: "Discount code not found!" });
			res.status(200).json(results[0]);
		}
	);
};

// Handler to create a new discount_code
const create = (req, res) => {
	const { code, discount_percent, valid_from, valid_until } = req.body;
	connection.query(
		"INSERT INTO discount_codes (code, discount_percent, valid_from, valid_until) VALUES (?, ?, ?, ?)",
		[code, discount_percent, valid_from, valid_until],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Discount code insert error", details: err });
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

// Handler to update a discount_code by id
const update = (req, res) => {
	const { id } = req.params;
	const { code, discount_percent, valid_from, valid_until } = req.body;
	connection.query(
		"UPDATE discount_codes SET code = ?, discount_percent = ?, valid_from = ?, valid_until = ? WHERE code_id = ?",
		[code, discount_percent, valid_from, valid_until, id],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Discount code update error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "Discount code not found!" });
			res.json({ id, code, discount_percent, valid_from, valid_until });
		}
	);
};

// Handler to delete a discount_code by id
const destroy = (req, res) => {
	const { id } = req.params;
	connection.query(
		"DELETE FROM discount_codes WHERE code_id = ?",
		[id],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Discount code delete error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "Discount code not found!" });
			res.sendStatus(204);
		}
	);
};

module.exports = { index, show, create, update, destroy };
