const connection = require("../db/db.js");

// Index: returning categories
const index = (req, res) => {
  const sql = "SELECT * FROM categories";
  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Query execution error: " + err });
    res.json(results);
  });
};

// Show: returning single categories
const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM categories WHERE category_id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Query execution error: " + err });
    if (results.length === 0)
      return res.status(404).json({ error: "Category not found!" });
    res.json(results[0]);
  });
};

// Create: adding new category
const create = (req, res) => {
  const { name, icon } = req.body;
  const sql = "INSERT INTO categories (name, icon) VALUES (?, ?)";
  connection.query(sql, [name, icon], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Category Insert error: " + err });
    res.status(201).json({ id: result.insertId, name, icon });
  });
};

// Update: updating existing category
const update = (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  const sql = "UPDATE categories SET name = ?, icon = ? WHERE category_id = ?";
  connection.query(sql, [name, icon, id], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Category Update error: " + err });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Category not found!" });
    res.json({ id, name, icon });
  });
};

// Destroy: delete single category
const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE category_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Category Delete error: " + err });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Category not found!" });
    res.sendStatus(204);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};