const { connection } = require("../db/db.js");


// Handler to get all products, with sorting/filter support
const allProducts = (req, res) => {
	console.log(req.query)
let selectAll="SELECT products.* FROM products"
let selectCount="SELECT COUNT(*) as count FROM products"
let countQueryPopular = "JOIN nerdnest_db.order_items ON order_items.product_id=products.product_id"
const {search, sort, cat, order} = req.query;
let {rpp, page} = req.query;
rpp=parseInt(rpp) 
console.log("rpp ",rpp)
page=parseInt(page)
console.log("page ",page)
//counted results
let resultCount;
//pages based on results
let pages=1;
//limit/offset query fragment
let limitOffset="" ;
let whereQ="";
let groupBy="";
// search filter
let searchQ="";
rpp ? limitOffset=`LIMIT ${rpp}`:limitOffset="";
//orderBY price
let orderBy =` ORDER BY price`;
if (order && order==="price_ASC")
  orderBy+=" ASC"
else if  (order && order==="price_DESC")
	orderBy+=" DESC"
		
		
		
		//category filters

	if (cat) whereQ=` WHERE category_name LIKE '${cat}'`
	if (cat && search)  searchQ=`AND name LIKE '%${search}%' OR description LIKE '%${search}%'`
	else if (search) searchQ=`WHERE name LIKE '%${search}%' OR description LIKE '%${search}%'`

	
	if(sort==="all") whereQ ="LIMIT 8";
	if(sort==="latest") whereQ =" WHERE created_at like '2025%' ";
	if(sort==="popular") whereQ =" JOIN nerdnest_db.order_items ON order_items.product_id=products.product_id GROUP BY products.product_id ";

// 	if (req.query.filter === "popular") {
// 		sortQ = ` JOIN nerdnest_db.order_items ON order_items.product_id=products.product_id GROUP BY products.product_id;`;
// 	}
//prima contiamo quanti risultati ci sono ${whereCat} ${searchQ}
connection.query( `${selectCount} ${sort==="popular"? countQueryPopular: whereQ}`,(err, results)=>{
	if (err)	return res.status(400).json({ error: "Query failed", details: err });
	else {
		//extrapolating result count
		resultCount=results[0].count
		//calculating pages
		if (rpp)   {
			resultCount%rpp!=0 ? pages=parseInt(resultCount/rpp)+1 : pages=resultCount/rpp

			console.log(page)
			if(page>1)  limitOffset=limitOffset+` OFFSET ${(parseInt(page)-1)*rpp} ` 
			
		}
	

		//poi costruiamo la query in base a i parametri di req.query 	${searchQ}	 
		connection.query(`${selectAll} ${whereQ} ${orderBy} ${limitOffset}`, (err, results) => {
			if (err) return res.status(400).json({ error: "Query failed", details: err });
			else {

				results.map((result) => {
				result.image_url = req.imagePath + result.image_url;
				result.price = parseFloat(result.price);
			});
			res.status(200).json({results,resultCount,pages});
			}
		});

	}
})
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
	let slug =
		brand.toLowerCase().replaceAll(" ", "-").replaceAll(".", "-") +
		"-" +
		name.toLowerCase().replaceAll(" ", "-").replaceAll(".", "-");
	slug = `${slug}`;

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
			slug,
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
				slug,
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
