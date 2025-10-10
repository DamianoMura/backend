const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const {
	getPaginatedProducts,
	searchProducts,
	searchAndPaginateProducts,
} = require("../controllers/productsFilterController.js");

// Route for getting all products with optional sorting
// router.get("/", productController.allProducts);

router.get("/:slug", productController.showProduct);
router.post("/", productController.addProduct);
router.put("/:slug", productController.modifyProduct);
router.delete("/:slug", productController.deleteProduct);

// Solo paginazione
router.get("/", getPaginatedProducts); // es: /api/products?page=2&limit=10

// Ricerca + paginazione
router.get("/search/page", searchAndPaginateProducts); // es: /api/products/search/page?term=scarpe&page=2&limit=10

module.exports = router;
