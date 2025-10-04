const { DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME } = process.env;
//we import mysql2 modules
const mysql = require("mysql2");

const products = require("./products");

// queries used to create the db:

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
	}
});

const seedDiscountCodes = () => {
	const discountCodes = [
		{
			code: "WELCOME10",
			discount_percent: 10,
			valid_from: "2025-10-01",
			valid_until: "2025-12-31",
		},
		{
			code: "FALL25",
			discount_percent: 25,
			valid_from: "2025-10-15",
			valid_until: "2025-11-30",
		},
		{
			code: "GAMER15",
			discount_percent: 15,
			valid_from: "2025-09-01",
			valid_until: "2025-10-31",
		},
	];

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
			"INSERT INTO products (name, brand, description, specs, price, stock_quantity, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name",
			[
				product.name,
				product.brand,
				product.description,
				product.specs,
				product.price,
				product.stock_quantity,
				product.image_url,
				product.category_id,
			],
			(err) => {
				if (err) console.log("query failed", err);
				else console.log(`query ${index + 1} of ${products.length}  succeded`);
			}
		);
	});
};

const seedCategories = () => {
	const categories = [
		{ name: "Laptop", icon: "laptop-icon.jpg" },
		{ name: "Phones", icon: "phone-icon.jpg" },
		{ name: "Headsets", icon: "headset-icon.jpg" },
		{ name: "Gaming Chairs", icon: "gamingchair-icon.jpg" },
		{ name: "Gaming Tables", icon: "gamingtable-icon.jpg" },
		{ name: "Desktops", icon: "desktop-icon.jpg" },
		{ name: "Mouse", icon: "mouse-icon.jpg" },
		{ name: "Keyboards", icon: "keyboard-icon.jpg" },
		{ name: "Monitor", icon: "monitor-icon.jpg" },
		{ name: "Cases", icon: "case-icon.jpg" },
		{ name: "Speakers", icon: "speaker-icon.jpg" },
	];
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
	const orders = [
		{
			order_id: 1001,
			customer_name: "Luca Bianchi",
			customer_email: "luca.bianchi@example.com",
			address_street: "Via Roma",
			address_street_number: 39,
			address_city: "Milano",
			postal_code: 20121,
			country: "Italia",
			billing: "Carta di credito",
			order_date: "2025-10-01",
			total_price: 89.9,
			discount_code_id: 2,
		},
		{
			order_id: 1002,
			customer_name: "Giulia Rossi",
			customer_email: "giulia.rossi@example.com",
			address_street: "Corso Garibaldi 45",
			address_street_number: 32,
			address_city: "Torino",
			postal_code: 10122,
			country: "Italia",
			billing: "PayPal",
			order_date: "2025-10-02",
			total_price: 149.5,
			discount_code_id: null,
		},
		{
			order_id: 1003,
			customer_name: "Marco Verdi",
			customer_email: "marco.verdi@example.com",
			address_street: "Via Dante",
			address_street_number: 35,
			address_city: "Napoli",
			postal_code: 80134,
			country: "Italia",
			billing: "Bonifico bancario",
			order_date: "2025-10-03",
			total_price: 59.0,
			discount_code_id: 3,
		},
		{
			order_id: 1004,
			customer_name: "Sara Neri",
			customer_email: "sara.neri@example.com",
			address_street: "Viale Europa 5",
			address_street_number: 30,
			address_city: "Firenze",
			postal_code: 50126,
			country: "Italia",
			billing: "Carta prepagata",
			order_date: "2025-10-04",
			total_price: 120.0,
			discount_code_id: 1,
		},
	];

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
