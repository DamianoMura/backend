const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

// CRUD routes
router.get("/", productController.allProducts); // GET all products
router.get("/:id", productController.showProduct); // GET single product
router.post("/", productController.addProduct); // POST new product
router.put("/:id", productController.modifyProduct); // PUT update product
router.delete("/:id", productController.deleteProduct); // DELETE delete product

module.exports = router;