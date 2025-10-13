const { DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME } = process.env;
//we import mysql2 modules
const mysql = require("mysql2");

const sluggedProducts =require('./seeder/products')
const categories = require("./seeder/categories");
const discountCodes = require("./seeder/discountCodes");
const listDiscountedItems = require("./seeder/discountedItems");
const orders = require("./seeder/orders");
const orderItems = require("./seeder/orderItems");

// Connessione al database
const pool = mysql.createConnection({
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	password: DB_PWD,
	database: DB_NAME,
});

pool.connect((err) => {
	if (err) console.log("connection error", err);
	else {
		console.log("Start seeding categories");
		seedCategories();
		console.log("Start seeding products");
		seedProducts();
		console.log("Start seeding discount_codes");
		seedDiscountCodes();
		console.log("Start seeding orders");
		seedOrders();
		console.log("Start seeding order_items");
		seedOrderItems();
		console.log("Start seeding discounted_items");
		seedDiscountedItems();
	}
});

const seedDiscountCodes = () => {
	
	discountCodes.forEach((discountCode, index) => {
		pool.query(
			"INSERT INTO discount_codes (code, discount_percent, valid_from, valid_until) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE code=code",
			[
				discountCode.code,
				discountCode.discount_percent,
				discountCode.valid_from,
				discountCode.valid_until,
			],
			(err) => {
				if (err) console.log("query failed", err);
				else
					console.log(
						`query ${index + 1} of ${discountCodes.length}  succeded`
					);
			}
		);
	});
};

const seedProducts = () => {
	sluggedProducts.map((product,index) => {
		
		pool.query(
			"INSERT INTO products (name, brand, description, specs, price, stock_quantity, image_url, category_id, category_name, created_at, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				product.name,
				product.brand,
				product.description,
				product.specs,
				product.price,
				product.stock_quantity,
				product.image_url,
				product.category_id,
				product.category_name,
				product.created_at,
				product.slug
			],
			(err) => {
				if (err) console.log("query failed", err);
				else console.log(`query ${index + 1} of ${sluggedProducts.length}  succeded`);
			}
		);
	});
};

const seedCategories = () => {
	
	categories.forEach((category, index) => {
		pool.query(
			"INSERT INTO categories (name, icon) VALUES (?, ?)",
			[category.name, category.icon],
			(err) => {
				if (err) console.log("query failed", err);
				else
					console.log(`query ${index + 1} of ${categories.length}  succeded`);
			}
		);
	});
};

const seedOrders = () => {
	
	orders.forEach((order, index) => {
		pool.query(
			"INSERT INTO orders (customer_name, customer_email, address_street, address_street_number, address_city, postal_code, country, billing, order_date,  discount_code_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				order.customer_name,
				order.customer_email,
				order.address_street,
				order.address_street_number,
				order.address_city,
				order.postal_code,
				order.country,
				order.billing,
				order.order_date,
				order.discount_code_id,
			],
			(err) => {
				if (err) console.log("query failed", err);
				else console.log(`query ${index + 1} of ${orders.length}  succeded`);
			}
		);
	});
};

const seedOrderItems = () => {
	
	orderItems.forEach((orderItem, index) => {
		pool.query(
			"INSERT INTO order_items (order_id, product_id, name, description, specs, price, quantity) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
			[
				parseInt(orderItem.order_id),
				parseInt(orderItem.product_id),
				orderItem.product_name,
				orderItem.description,
				orderItem.specs,
				parseFloat(orderItem.price),
				orderItem.quantity
			],
			(err) => {
				if (err) console.log("query failed", err);
				else
					console.log(`query ${index + 1} of ${orderItems.length}  succeded`);
			}
		);
	});
};

const seedDiscountedItems = () => {
	listDiscountedItems.map((item)=>{
				pool.query(
			"INSERT INTO discounted-items ( product_id, discount_value) VALUES ( ?, ?)",
			[
				
				parseInt(item.product_id),
				parseInt(item.discount_value)
				
			],
			(err) => {
				if (err) console.log("query failed", err);
				else
					console.log(`query ${index + 1} of ${orderItems.length}  succeded`);
			}
		);
	})
};