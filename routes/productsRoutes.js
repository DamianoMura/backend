const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

// Route for getting all products with optional sorting
// router.get("/", productController.allProducts);

router.get("/:slug", productController.showProduct);
router.post("/", productController.addProduct);
router.put("/:slug", productController.modifyProduct);
router.delete("/:slug", productController.deleteProduct);

// // Lista prodotti con paginazione e ordinamento
router.get("/", productController.allProducts); // es: /products?page=2&limit=10

module.exports = router;
