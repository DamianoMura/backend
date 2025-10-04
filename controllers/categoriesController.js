const { connection } = require("../db/db");

// Handler to get all categories
const index = (req, res) => {
	connection.query("SELECT * FROM categories", (err, results) => {
		if (err)
			return res.status(500).json({ error: "Query failed", details: err });
		res.status(200).json(results);
	});
};

// Handler to get a single category by id
const show = (req, res) => {
	const { id } = req.params;
	connection.query(
		"SELECT * FROM categories WHERE category_id = ?",
		[id],
		(err, results) => {
			if (err)
				return res.status(500).json({ error: "Query failed", details: err });
			if (!results.length)
				return res.status(404).json({ error: "Category not found!" });
			res.status(200).json(results[0]);
		}
	);
};

// Handler to create a new category
const create = (req, res) => {
	const { name, icon } = req.body;
	connection.query(
		"INSERT INTO categories (name, icon) VALUES (?, ?)",
		[name, icon],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Category insert error", details: err });
			res.status(201).json({ id: result.insertId, name, icon });
		}
	);
};

// Handler to update a category by id
const update = (req, res) => {
	const { id } = req.params;
	const { name, icon } = req.body;
	connection.query(
		"UPDATE categories SET name = ?, icon = ? WHERE category_id = ?",
		[name, icon, id],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Category update error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "Category not found!" });
			res.json({ id, name, icon });
		}
	);
};

// Handler to delete a category by id
const destroy = (req, res) => {
	const { id } = req.params;
	connection.query(
		"DELETE FROM categories WHERE category_id = ?",
		[id],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Category delete error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "Category not found!" });
			res.sendStatus(204);
		}
	);
};

module.exports = { index, show, create, update, destroy };
