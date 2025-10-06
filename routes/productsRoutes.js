const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

// Route for getting all products with optional sorting
router.get("/", productController.allProducts);

router.get("/:id", productController.showProduct);
router.post("/", productController.addProduct);
router.put("/:id", productController.modifyProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;