const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

// Route for getting all products
router.get("/", productController.allProducts);

// Route for getting a single product by id
router.get("/:id", productController.showProduct);

// Route for creating a new product
router.post("/", productController.addProduct);

// Route for updating a product by id
router.put("/:id", productController.modifyProduct);

// Route for deleting a product by id
router.delete("/:id", productController.deleteProduct);

module.exports = router;