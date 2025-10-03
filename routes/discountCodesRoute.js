const express = require("express");
const router = express.Router();
const discountCodesController = require("../controllers/discountCodesController");

// CRUD routes
router.get("/", discountCodesController.index); // GET all discount_codes
router.get("/:id", discountCodesController.show); // GET single discount_code
router.post("/", discountCodesController.create); // POST new discount_code
router.put("/:id", discountCodesController.update); // PUT update discount_code
router.delete("/:id", discountCodesController.destroy); // DELETE delete discount_code

module.exports = router;
