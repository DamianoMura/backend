const express = require("express");
const router = express.Router();
const orderItemsController = require("../controllers/orderItemsController");

// Route for getting all orders
router.get("/", orderItemsController.index);

// Route for getting a single order by id
router.get("/:id", orderItemsController.show);

// Route for creating a new order
router.post("/", orderItemsController.create);

// Route for updating an order by id
router.put("/:id", orderItemsController.update);

// Route for deleting an order by id
router.delete("/:id", orderItemsController.destroy);

module.exports = router;
