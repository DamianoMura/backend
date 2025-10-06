module.exports = function createTables(connection, callback) {
  const databaseTableStructure = [
    "CREATE TABLE IF NOT EXISTS categories (category_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) UNIQUE, icon VARCHAR(255));",
    "CREATE TABLE IF NOT EXISTS products (product_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), brand VARCHAR(255), description TEXT, specs TEXT, price DECIMAL, stock_quantity INT, image_url VARCHAR(255), category_id INT);",
    "CREATE TABLE IF NOT EXISTS discounted_items (discounted_items_id INT PRIMARY KEY AUTO_INCREMENT, product_id INT, discount_value TINYINT);",
    "CREATE TABLE IF NOT EXISTS discount_codes (code_id INT PRIMARY KEY AUTO_INCREMENT, code VARCHAR(255) UNIQUE, discount_percent INT, valid_from DATE, valid_until DATE);",
    "CREATE TABLE IF NOT EXISTS orders (order_id INT PRIMARY KEY AUTO_INCREMENT, customer_name VARCHAR(255), customer_email VARCHAR(255), address_street VARCHAR(255), address_street_number SMALLINT, address_city VARCHAR(255), postal_code VARCHAR(255), country VARCHAR(255), billing VARCHAR(255), order_date DATETIME, total_price DECIMAL, discount_code_id INT);",
    "CREATE TABLE IF NOT EXISTS order_items (order_item_id INT PRIMARY KEY AUTO_INCREMENT, order_id INT, product_id INT, name VARCHAR(255), description TEXT, specs TEXT, price DECIMAL, quantity INT, price_at_purchase DECIMAL);",
    "ALTER TABLE products ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);",
    "ALTER TABLE discounted_items ADD FOREIGN KEY (product_id) REFERENCES products(product_id);",
    "ALTER TABLE orders ADD FOREIGN KEY (discount_code_id) REFERENCES discount_codes(code_id);",
    "ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES orders(order_id);",
    "ALTER TABLE order_items ADD FOREIGN KEY (product_id) REFERENCES products(product_id);"
  ];

//we import mysql2 modules
const mysql = require("mysql2")
//queries used to create the db:


  const createTables = () =>{
      const databaseTableStructure = [
      "CREATE TABLE `categories` (`category_id` int PRIMARY KEY AUTO_INCREMENT, `name` varchar(255), `icon` varchar(255));",
      "CREATE TABLE `products` (`product_id` int PRIMARY KEY AUTO_INCREMENT, `name` varchar(255), `brand` varchar(255), `description` text,`created_at` date NOT NULL, `specs` text, `price` decimal, `stock_quantity` int, `image_url` varchar(255), `category_id` int);",
      "CREATE TABLE `discounted_items` (`discounted_items_id` int PRIMARY KEY AUTO_INCREMENT, `product_id` int, `discount_value` tinyint);",
      "CREATE TABLE `discount_codes` (`code_id` int PRIMARY KEY AUTO_INCREMENT, `code` varchar(255) UNIQUE, `discount_percent` int, `valid_from` date, `valid_until` date);",
      "CREATE TABLE `orders` ( `order_id` int PRIMARY KEY AUTO_INCREMENT, `customer_name` varchar(255), `customer_email` varchar(255), `address_street` varchar(255), `address_street_number` smallint, `address_city` varchar(255), `postal_code` varchar(255), `country` varchar(255), `billing` varchar(255), `order_date` datetime, `total_price` decimal, `discount_code_id` int);",
      "CREATE TABLE `order_items` (`order_item_id` int PRIMARY KEY AUTO_INCREMENT, `order_id` int, `product_id` int, `name` varchar(255), `description` text, `specs` text, `price` decimal, `quantity` int, `price_at_purchase` decimal);",
      "ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);",
      "ALTER TABLE `discounted_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);",
      "ALTER TABLE `orders` ADD FOREIGN KEY (`discount_code_id`) REFERENCES `discount_codes` (`code_id`);",
      "ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);",
      "ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);"
        ]

    
    const db_connection = mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER, 
      password: DB_PWD,
      database: DB_NAME
    })
    
    db_connection.connect(function(err) {
      if (err) console.log(err);
      console.log("...creating tables...");
      databaseTableStructure.map((query,index)=>{
        db_connection.query(query,(err)=>{
          if (err) {
            console.log("query failed",err)
          }
          else{
            console.log(`query ${index+1} of ${databaseTableStructure.length} successful`)
          }
        })
  })
    });
  });
};













