
  const databaseTableStructure = [
    //categories table
    "CREATE TABLE categories (category_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) UNIQUE, icon VARCHAR(255));",
    //products table
    "CREATE TABLE products (product_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), brand VARCHAR(255), description TEXT, specs TEXT, price DECIMAL, stock_quantity BIGINT, image_url VARCHAR(255), category_id INT, category_name VARCHAR(255),created_at DATE NOT NULL);",
    //discount tables
    "CREATE TABLE discounted_items (discounted_items_id INT PRIMARY KEY AUTO_INCREMENT, product_id INT, discount_value TINYINT);",
    "CREATE TABLE discount_codes (code_id INT PRIMARY KEY AUTO_INCREMENT, code VARCHAR(255) UNIQUE, discount_percent INT, valid_from DATE, valid_until DATE);",
    //orders table
    "CREATE TABLE orders (order_id INT PRIMARY KEY AUTO_INCREMENT, customer_name VARCHAR(255), customer_email VARCHAR(255), address_street VARCHAR(255), address_street_number SMALLINT, address_city VARCHAR(255), postal_code VARCHAR(255), country VARCHAR(255), billing VARCHAR(255), order_date DATETIME,  discount_code_id INT);",
    //order items table
    "CREATE TABLE order_items (order_item_id INT PRIMARY KEY AUTO_INCREMENT, order_id INT, product_id INT, name VARCHAR(255), description TEXT, specs TEXT, price DECIMAL, quantity INT);",
    "ALTER TABLE products ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);",
    //setting foreign/primary keys for discount tables
    "ALTER TABLE discounted_items ADD FOREIGN KEY (product_id) REFERENCES products(product_id);",
    // setting foreign/primary keys for orders table  
    "ALTER TABLE orders ADD FOREIGN KEY (discount_code_id) REFERENCES discount_codes(code_id);",
    // setting foreign/primary keys for order_items table
    "ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES orders(order_id);",
    //setting foreign/primary keys for order_items table       
    "ALTER TABLE order_items ADD FOREIGN KEY (product_id) REFERENCES products(product_id);"
  ];

  // Execute each query in sequence (async but waits for all)
const createTables = (connection) => {
  databaseTableStructure.forEach((query, index) => {
    connection.query(query, (err) => {
      if (err) {
        console.log("query failed", err);
      } else {
        console.log(`query ${index + 1} of ${databaseTableStructure.length} successful`);
      }
  
    });
    
  });
  console.log("All tables created");
}

module.exports = createTables;













