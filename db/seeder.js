const { DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME } = process.env;
//we import mysql2 modules
const mysql = require("mysql2");

const products = require("./products");

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

const seedOrderItems = () => {
	const orderItems = [
		{
			order_item_id: 1,
			order_id: 1,
			product_id: 1,
			name: "Mouse Wireless",
			description: "Mouse ergonomico con connessione Bluetooth",
			specs: "800–1600 DPI, batteria ricaricabile",
			price: 29.9,
			quantity: 1,
			price_at_purchase: 29.9,
		},
		{
			order_item_id: 2,
			order_id: 1,
			product_id: 2,
			name: "Tappetino Mouse",
			description: "Tappetino antiscivolo in neoprene",
			specs: "Dimensioni 25x20 cm, colore nero",
			price: 9.9,
			quantity: 2,
			price_at_purchase: 19.8,
		},
		{
			order_item_id: 3,
			order_id: 2,
			product_id: 3,
			name: "Cuffie Over-Ear",
			description: "Cuffie con cancellazione del rumore",
			specs: "Bluetooth 5.0, autonomia 20h",
			price: 89.0,
			quantity: 1,
			price_at_purchase: 89.0,
		},
		{
			order_item_id: 4,
			order_id: 2,
			product_id: 4,
			name: "Power Bank 10000mAh",
			description: "Caricatore portatile USB-C",
			specs: "2 porte USB, ricarica rapida",
			price: 60.5,
			quantity: 1,
			price_at_purchase: 60.5,
		},
		{
			order_item_id: 5,
			order_id: 3,
			product_id: 5,
			name: "Supporto Laptop",
			description: "Supporto regolabile in alluminio",
			specs: "Compatibile fino a 17 pollici",
			price: 59.0,
			quantity: 1,
			price_at_purchase: 59.0,
		},
		{
			order_item_id: 6,
			order_id: 4,
			product_id: 6,
			name: "Zaino Tech",
			description: "Zaino impermeabile con porta USB",
			specs: "Capacità 25L, tasche imbottite",
			price: 65.0,
			quantity: 1,
			price_at_purchase: 65.0,
		},
		{
			order_item_id: 7,
			order_id: 4,
			product_id: 7,
			name: "Notebook A5",
			description: "Quaderno con copertina rigida",
			specs: "80 fogli, carta riciclata",
			price: 5.0,
			quantity: 3,
			price_at_purchase: 15.0,
		},
		{
			order_item_id: 8,
			order_id: 4,
			product_id: 8,
			name: "Penna Gel",
			description: "Penna a inchiostro nero",
			specs: "Punta 0.7mm, impugnatura morbida",
			price: 2.0,
			quantity: 5,
			price_at_purchase: 10.0,
		},
		{
			order_item_id: 9,
			order_id: 2,
			product_id: 9,
			name: "Adattatore USB-C",
			description: "Adattatore multiporta HDMI/USB",
			specs: "Compatibile con Mac e Windows",
			price: 35.0,
			quantity: 1,
			price_at_purchase: 35.0,
		},
		{
			order_item_id: 10,
			order_id: 1,
			product_id: 10,
			name: "Custodia Laptop",
			description: "Custodia imbottita 15.6 pollici",
			specs: "Materiale neoprene, colore grigio",
			price: 40.2,
			quantity: 1,
			price_at_purchase: 40.2,
		},
	];

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