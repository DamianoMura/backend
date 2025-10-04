const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// Route for getting all orders
router.get("/", ordersController.index);

// Route for getting a single order by id
router.get("/:id", ordersController.show);

// Route for creating a new order
router.post("/", ordersController.create);

// Route for updating an order by id
router.put("/:id", ordersController.update);

// Route for deleting an order by id
router.delete("/:id", ordersController.destroy);

module.exports = router;
