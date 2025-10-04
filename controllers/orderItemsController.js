const { connection } = require("../db/db");

// Handler to get all order_items
const index = (req, res) => {
	connection.query("SELECT * FROM order_items", (err, results) => {
		if (err)
			return res.status(500).json({ error: "Query failed", details: err });
		res.status(200).json(results);
	});
};

// Handler to get a single order_item by id
const show = (req, res) => {
	const { id } = req.params;
	connection.query(
		"SELECT * FROM order_items WHERE order_item_id = ?",
		[id],
		(err, results) => {
			if (err)
				return res.status(500).json({ error: "Query failed", details: err });
			if (!results.length)
				return res.status(404).json({ error: "order_item not found!" });
			res.status(200).json(results[0]);
		}
	);
};

// Handler to create a new order_item
const create = (req, res) => {
	const {
		order_id,
		product_id,
		name,
		description,
		specs,
		price,
		quantity,
		price_at_purchase,
	} = req.body;
	connection.query(
		"INSERT INTO order_items (order_id, product_id, name, description, specs, price, quantity,price_at_purchase) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		[
			order_id,
			product_id,
			name,
			description,
			specs,
			price,
			quantity,
			price_at_purchase,
		],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "order_item insert error", details: err });
			res.status(201).json({
				id: result.insertId,
				order_id,
				product_id,
				name,
				description,
				specs,
				price,
				quantity,
				price_at_purchase,
			});
		}
	);
};

// Handler to update a order_item by id
const update = (req, res) => {
	const { id } = req.params;
	const {
		order_id,
		product_id,
		name,
		description,
		specs,
		price,
		quantity,
		price_at_purchase,
	} = req.body;
	connection.query(
		"UPDATE order_items SET order_id = ?, product_id = ?, name = ?, description = ?, specs = ?, price = ?, quantity = ?,price_at_purchase = ? WHERE order_item_id = ?",
		[
			order_id,
			product_id,
			name,
			description,
			specs,
			price,
			quantity,
			price_at_purchase,
		],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "order_item update error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "order_item not found!" });
			res.json({
				id,
				order_id,
				product_id,
				name,
				description,
				specs,
				price,
				quantity,
				price_at_purchase,
				id,
			});
		}
	);
};

// Handler to delete a order_item by id
const destroy = (req, res) => {
	const { id } = req.params;
	connection.query(
		"DELETE FROM order_items WHERE order_item_id = ?",
		[id],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "order_item delete error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "order_item not found!" });
			res.sendStatus(204);
		}
	);
};

module.exports = { index, show, create, update, destroy };
