const { DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME } = process.env;
//we import mysql2 modules
const mysql = require("mysql2");

const products = require("./seeder/products");
const categories = require("./seeder/categories");
const discountCodes = require("./seeder/discountCodes");
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
	products.forEach((product, index) => {
		pool.query(
			"INSERT INTO products (name, brand, description, specs, price, stock_quantity, image_url, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[
				product.name,
				product.brand,
				product.description,
				product.specs,
				product.price,
				product.stock_quantity,
				product.image_url,
				product.category_id,
				product.created_at
			],
			(err) => {
				if (err) console.log("query failed", err);
				else console.log(`query ${index + 1} of ${products.length}  succeded`);
			}
		);
	});
};

const seedCategories = () => {
	
	categories.forEach((category, index) => {
		pool.query(
			"INSERT INTO categories (name, icon) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=name",
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
			"INSERT INTO orders (customer_name, customer_email, address_street, address_street_number, address_city, postal_code, country, billing, order_date, total_price, discount_code_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE customer_name=customer_name",
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
				order.total_price,
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
			"INSERT INTO order_items (order_id, product_id, name, description, specs, price, quantity, price_at_purchase) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			[
				orderItem.order_id,
				orderItem.product_id,
				orderItem.name,
				orderItem.description,
				orderItem.specs,
				orderItem.price,
				orderItem.quantity,
				orderItem.price_at_purchase,
			],
			(err) => {
				if (err) console.log("query failed", err);
				else
					console.log(`query ${index + 1} of ${orderItems.length}  succeded`);
			}
		);
	});
};