const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

// CRUD routes
router.get("/", ordersController.index); // GET all orders
router.get("/:id", ordersController.show); // GET single order
router.post("/", ordersController.create); // POST new order
router.put("/:id", ordersController.update); // PUT update order
router.delete("/:id", ordersController.destroy); // DELETE delete order

module.exports = router;
