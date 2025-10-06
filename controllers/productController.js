const { connection } = require("../db/db");

// Handler to get all products, with sorting/filter support
const allProducts = (req, res) => {
  let baseQuery = "SELECT * FROM products";
  let sorting = "";

  // Sort by recent (assuming product_id is auto-increment)
  if (req.query.sort === "recent") sorting = " ORDER BY product_id DESC LIMIT 10";
  // Sort by popular (if you have a sales count field, otherwise fallback)
  if (req.query.sort === "popular") sorting = " ORDER BY product_id ASC LIMIT 10";

  connection.query(baseQuery + sorting, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Query failed", details: err });
    res.status(200).json(results);
  });
};

// Handler to get a single product by id
const showProduct = (req, res) => {
	const { id } = req.params;
	connection.query(
		"SELECT * FROM products WHERE product_id = ?",
		[id],
		(err, results) => {
			if (err)
				return res.status(500).json({ error: "Query failed", details: err });
			if (!results.length)
				return res.status(404).json({ error: "Product not found!" });
			res.status(200).json(results[0]);
		}
	);
};

// Handler to create a new product
const addProduct = (req, res) => {
	const {
		name,
		brand,
		description,
		specs,
		price,
		stock_quantity,
		image_url,
		category_id,
	} = req.body;
	connection.query(
		"INSERT INTO products (name, brand, description, specs, price, stock_quantity, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		[
			name,
			brand,
			description,
			specs,
			price,
			stock_quantity,
			image_url,
			category_id,
		],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Product insert error", details: err });
			res
				.status(201)
				.json({
					id: result.insertId,
					name,
					brand,
					description,
					specs,
					price,
					stock_quantity,
					image_url,
					category_id,
				});
		}
	);
};

// Handler to update a product by id
const modifyProduct = (req, res) => {
	const { id } = req.params;
	const {
		name,
		brand,
		description,
		specs,
		price,
		stock_quantity,
		image_url,
		category_id,
	} = req.body;
	connection.query(
		"UPDATE products SET name = ?, brand = ?, description = ?, specs = ?, price = ?, stock_quantity = ?, image_url = ?, category_id = ? WHERE product_id = ?",
		[
			name,
			brand,
			description,
			specs,
			price,
			stock_quantity,
			image_url,
			category_id,
			id,
		],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Product update error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "Product not found!" });
			res.json({
				id,
				name,
				brand,
				description,
				specs,
				price,
				stock_quantity,
				image_url,
				category_id,
			});
		}
	);
};

// Handler to delete a product by id
const deleteProduct = (req, res) => {
	const { id } = req.params;
	connection.query(
		"DELETE FROM products WHERE product_id = ?",
		[id],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Product delete error", details: err });
			if (!result.affectedRows)
				return res.status(404).json({ error: "Product not found!" });
			res.sendStatus(204);
		}
	);
};

module.exports = {
  allProducts,
  showProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
};
