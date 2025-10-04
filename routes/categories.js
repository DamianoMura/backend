const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Route for getting all categories
router.get('/', categoriesController.index);

// Route for getting a single category by id
router.get('/:id', categoriesController.show);

// Route for creating a new category
router.post('/', categoriesController.create);

// Route for updating a category by id
router.put('/:id', categoriesController.update);

// Route for deleting a category by id
router.delete('/:id', categoriesController.destroy);

module.exports = router;