const connection = require("../db/db.js");

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
	const { name, icon } = req.body;
	const sql = "INSERT INTO categories (name, icon) VALUES (?, ?)";
	connection.query(sql, [name, icon], (err, result) => {
		if (err)
			return res.status(500).json({ error: "Category Insert error: " + err });
		res.status(201).json({ id: result.insertId, name, icon });
	});
};

// Update: updating existing discount_codes
const update = (req, res) => {
	const { id } = req.params;
	const { name, icon } = req.body;
	const sql = "UPDATE categories SET name = ?, icon = ? WHERE category_id = ?";
	connection.query(sql, [name, icon, id], (err, result) => {
		if (err)
			return res.status(500).json({ error: "Category Update error: " + err });
		if (result.affectedRows === 0)
			return res.status(404).json({ error: "Category not found!" });
		res.json({ id, name, icon });
	});
};

// Destroy: delete single discount_codes
const destroy = (req, res) => {
	const { id } = req.params;
	const sql = "DELETE FROM categories WHERE category_id = ?";
	connection.query(sql, [id], (err, result) => {
		if (err)
			return res.status(500).json({ error: "Category Delete error: " + err });
		if (result.affectedRows === 0)
			return res.status(404).json({ error: "Category not found!" });
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
