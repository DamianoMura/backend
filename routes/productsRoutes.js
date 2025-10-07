const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");
const setSlugPath = require("../middlewares/slugMiddleware.js");

// Route for getting all products with optional sorting
router.get("/", productController.allProducts);

router.get("/:id",setSlugPath, productController.showProduct);
router.post("/", productController.addProduct);
router.put("/:id",setSlugPath, productController.modifyProduct);
router.delete("/:id",setSlugPath, productController.deleteProduct);

module.exports = router;