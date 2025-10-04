const { connection } = require("../db/db");

// Handler to get all orders
const index = (req, res) => {
	connection.query("SELECT * FROM orders", (err, results) => {
		if (err)
			return res.status(500).json({ error: "Query failed", details: err });
		res.status(200).json(results);
	});
};

// Handler to get a single order by id
const show = (req, res) => {
	const { id } = req.params;
	connection.query(
		"SELECT * FROM orders WHERE order_id = ?",
		[id],
		(err, results) => {
			if (err)
				return res.status(500).json({ error: "Query failed", details: err });
			if (!results.length)
				return res.status(404).json({ error: "Order not found!" });
			res.status(200).json(results[0]);
		}
	);
};

// Handler to create a new order
const create = (req, res) => {
	const {
		customer_name,
		customer_email,
		address_street,
		address_street_number,
		address_city,
		postal_code,
		country,
		billing,
		order_date,
		total_price,
		discount_code_id,
	} = req.body;
	connection.query(
		"INSERT INTO orders (customer_name, customer_email, address_street, address_street_number, address_city, postal_code, country, billing, order_date, total_price, discount_code_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			customer_name,
			customer_email,
			address_street,
			address_street_number,
			address_city,
			postal_code,
			country,
			billing,
			order_date,
			total_price,
			discount_code_id,
		],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Order insert error", details: err });
			res.status(201).json({
				id: result.insertId,
				customer_name,
				customer_email,
				address_street,
				address_street_number,
				address_city,
				postal_code,
				country,
				billing,
				order_date,
				total_price,
				discount_code_id,
			});
		}
	);
};

// Handler to update an order by id
const update = (req, res) => {
	const { id } = req.params;
	const {
		customer_name,
		customer_email,
		address_street,
		address_street_number,
		address_city,
		postal_code,
		country,
		billing,
		order_date,
		total_price,
		discount_code_id,
	} = req.body;
	connection.query(
		"UPDATE orders SET customer_name = ?, customer_email = ?, address_street = ?, address_street_number = ?, address_city = ?, postal_code = ?, country = ?, billing = ?, order_date = ?, total_price = ?, discount_code_id = ? WHERE order_id = ?",
		[
			customer_name,
			customer_email,
			address_street,
			address_street_number,
			address_city,
			postal_code,
			country,
			billing,
			order_date,
			total_price,
			discount_code_id,
			id,
		],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Order update error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "Order not found!" });
			res.json({
				id,
				customer_name,
				customer_email,
				address_street,
				address_street_number,
				address_city,
				postal_code,
				country,
				billing,
				order_date,
				total_price,
				discount_code_id,
			});
		}
	);
};

// Handler to delete an order by id
const destroy = (req, res) => {
	const { id } = req.params;
	connection.query(
		"DELETE FROM orders WHERE order_id = ?",
		[id],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Order delete error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "Order not found!" });
			res.sendStatus(204);
		}
	);
};

module.exports = { index, show, create, update, destroy };
