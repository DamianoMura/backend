CREATE TABLE `users` (
  `user_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `surname` varchar(255),
  `address` varchar(255),
  `email` varchar(255) UNIQUE,
  `password` varchar(255)
);

CREATE TABLE `categories` (
  `category_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `icon` varchar(255)
);

CREATE TABLE `products` (
  `product_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` text,
  `price` decimal,
  `stock_quantity` int,
  `specs` text,
  `image_url` varchar(255),
  `category_id` int
);

CREATE TABLE `discounted_items` (
  `discounted_items_id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int,
  `discount_value` tinyint
);

CREATE TABLE `discount_codes` (
  `code_id` int PRIMARY KEY AUTO_INCREMENT,
  `code` varchar(255) UNIQUE,
  `discount_percent` int,
  `valid_from` date,
  `valid_until` date
);

CREATE TABLE `carts` (
  `cart_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int
);

CREATE TABLE `cart_items` (
  `cart_item_id` int PRIMARY KEY AUTO_INCREMENT,
  `cart_id` int,
  `product_id` int,
  `quantity` int
);

CREATE TABLE `orders` (
  `order_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `discount_codes_id` int
);

CREATE TABLE `orders_items` (
  `orders_items_id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int,
  `order_id` int,
  `quantity` int
);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

ALTER TABLE `discounted_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`);

ALTER TABLE `cart_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`discount_codes_id`) REFERENCES `discount_codes` (`code_id`);

ALTER TABLE `orders_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `orders_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);
