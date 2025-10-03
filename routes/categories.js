const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// CRUD routes
router.get('/', categoriesController.index);         // GET all categories
router.get('/:id', categoriesController.show);       // GET single category
router.post('/', categoriesController.create);       // POST new category
router.put('/:id', categoriesController.update);     // PUT update category
router.delete('/:id', categoriesController.destroy); // DELETE delete category

module.exports = router;