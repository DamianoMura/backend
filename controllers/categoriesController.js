// Import the database connection from db.js
const connection = require("../db/db.js");

/**
 * Get all categories
 * Route: GET /categories
 */
const index = (req, res) => {
  const sql = "SELECT * FROM categories";
  connection.query(sql, (err, results) => {
    if (err)
      // Internal server error if query fails
      return res.status(500).json({ error: "Query execution error: " + err });
    res.status(200).json(results);
  });
};

/**
 * Get a single category by id
 * Route: GET /categories/:id
 */
const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM categories WHERE category_id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err)
      // Internal server error if query fails
      return res.status(500).json({ error: "Query execution error: " + err });
    if (results.length === 0)
      // Not found if category does not exist
      return res.status(404).json({ error: "Category not found!" });
    res.status(200).json(results[0]);
  });
};

/**
 * Create a new category
 * Route: POST /categories
 */
const create = (req, res) => {
  const { name, icon } = req.body;
  const sql = "INSERT INTO categories (name, icon) VALUES (?, ?)";
  connection.query(sql, [name, icon], (err, result) => {
    if (err)
      // Internal server error if insert fails
      return res.status(500).json({ error: "Category insert error: " + err });
    // Return the created category
    res.status(201).json({ id: result.insertId, name, icon });
  });
};

/**
 * Update an existing category
 * Route: PUT /categories/:id
 */
const update = (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  const sql = "UPDATE categories SET name = ?, icon = ? WHERE category_id = ?";
  connection.query(sql, [name, icon, id], (err, result) => {
    if (err)
      // Internal server error if update fails
      return res.status(500).json({ error: "Category update error: " + err });
    if (result.affectedRows === 0)
      // Not found if category does not exist
      return res.status(404).json({ error: "Category not found!" });
    // Return the updated category
    res.status(200).json({ id, name, icon });
  });
};

/**
 * Delete a single category by id
 * Route: DELETE /categories/:id
 */
const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE category_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err)
      // Internal server error if delete fails
      return res.status(500).json({ error: "Category delete error: " + err });
    if (result.affectedRows === 0)
      // Not found if category does not exist
      return res.status(404).json({ error: "Category not found!" });
    // No content
    res.sendStatus(204);
  });
};

// Export CRUD functions
module.exports = {
  index,
  show,
  create,
  update,
  destroy
};