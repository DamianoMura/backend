const express = require("express");
const router = express.Router();
const discountCodesController = require("../controllers/discountCodesController");

// Route for getting all discount codes
router.get("/", discountCodesController.index);

// Route for getting a single discount code by id
router.get("/:id", discountCodesController.show);

// Route for creating a new discount code
router.post("/", discountCodesController.create);

// Route for updating a discount code by id
router.put("/:id", discountCodesController.update);

// Route for deleting a discount code by id
router.delete("/:id", discountCodesController.destroy);

module.exports = router;
