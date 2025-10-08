const { connection } = require("../db/db");

// Handler to get all products, with sorting/filter support
const allProducts = (req, res) => {
	let baseQuery = "SELECT * FROM products";
	let sorting = ";";
	console.log(req.query)
	// Sort by recent (assuming product_id is auto-increment)
	if (req.query.sort === "latest")
		sorting = " ORDER BY DATE(created_at) DESC;";

	if (req.query.sort === "popular") {
		baseQuery = `SELECT products.* FROM products`;
		sorting = ` JOIN nerdnest_db.order_items ON order_items.product_id=products.product_id GROUP BY products.product_id ORDER BY sum(order_items.quantity) DESC;`;
	}

	if (req.query.sort === "price") {}
	if (req.query.sort === "category_name") {}
	connection.query(baseQuery + sorting, (err, results) => {
		if (err)
			return res.status(500).json({ error: "Query failed", details: err });
		results.map((result)=>{
			result.image_url=req.imagePath + result.image_url;
			
		})
		results[0].price = parseFloat(results[0].price);
		res.status(200).json(results);
	});
};

// Handler to get a single product by id
const showProduct = (req, res) => {
	const { slug } = req.params;

	connection.query(
		"SELECT *  FROM products WHERE slug = ?",
		[slug],
		(err, results) => {
			if (err)
				return res.status(500).json({ error: "Query failed", details: err });
			if (!results.length)
				return res.status(404).json({ error: "Product not found!" });
			results[0].image_url = req.imagePath + results[0].image_url;
			results[0].price = parseFloat(results[0].price);
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
		price = parseFloat(price),
		stock_quantity,
		image_url,
		category_id,
		category_name,
		created_at = new Date(),
	} = req.body;
	let slug = brand.toLowerCase().replaceAll(" ","-").replaceAll(".","-")+"-"+name.toLowerCase().replaceAll(" ","-").replaceAll(".","-");
	slug=`${slug}`;
  
	connection.query(
		"INSERT INTO products (name, brand, description, specs, price, stock_quantity, image_url, category_id, category_name, created_at,slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			name,
			brand,
			description,
			specs,
			price,
			stock_quantity,
			image_url,
			category_id,
			category_name,
			created_at,
			slug
		],
		(err, result) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Product insert error", details: err });
			res.status(201).json({
				id: result.insertId,
				name,
				brand,
				description,
				specs,
				price,
				stock_quantity,
				image_url,
				category_id,
				category_name,
				created_at,
				slug
			});
		}
	);
};

// Handler to update a product by id
const modifyProduct = (req, res) => {
	const { slug } = req.params;
	const {
		name,
		brand,
		description,
		specs,
		price,
		stock_quantity,
		image_url,
		category_id,
		category_name,
		created_at,
		
	} = req.body;
	connection.query(
		"UPDATE products SET name = ?, brand = ?, description = ?, specs = ?, price = ?, stock_quantity = ?, image_url = ?, category_id = ?,category_name = ?, created_at = ? WHERE slug = ?",
		[
			name,
			brand,
			description,
			specs,
			price,
			stock_quantity,
			image_url,
			category_id,
			category_name,
			created_at,
			slug,
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
				category_name,
				created_at,
			});
		}
	);
};

// Handler to delete a product by id
const deleteProduct = (req, res) => {
	const { slug } = req.params;
	connection.query(
		"DELETE FROM products WHERE slug = ?",
		[slug],
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
