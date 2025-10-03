// const db_connection = require('../db/db')
const { DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME } = process.env;
// we import mysql2 module
const mysql = require("mysql2");

// queries used to create the db:
const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`mysql connected to ${connection.config.host}:${connection.config.port}/${connection.config.database}`);
});
// connessione creata

/**
 * Get all categories
 */
const index = (req, res) => {
  const query = "SELECT * FROM categories";
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "query failed" });
    console.log(results);
    res.status(200).json(results);
  });
};

/**
 * Get a category by id
 */
const show = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM categories WHERE category_id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "query failed", error: err });
    if (results.length === 0) return res.status(404).json({ error: "Category not found!" });
    res.status(200).json(results[0]);
  });
};

/**
 * Create a new category
 */
const create = (req, res) => {
  console.log(req.body);
  const { name, icon } = req.body;
  const sql = "INSERT INTO categories (name, icon) VALUES (?, ?)";
  connection.query(sql, [name, icon], (err, result) => {
    if (err) return res.status(500).json({ error: "Category Insert error: " + err });
    res.status(201).json({ id: result.insertId, name, icon });
  });
};

/**
 * Update a category by id
 */
const update = (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  const sql = "UPDATE categories SET name = ?, icon = ? WHERE category_id = ?";
  connection.query(sql, [name, icon, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Category Update error: " + err });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Category not found!" });
    res.json({ id, name, icon });
  });
};

/**
 * Delete a category by id
 */
const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE category_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Category Delete error: " + err });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Category not found!" });
    res.sendStatus(204);
  });
};

module.exports = { index, show, create, update, destroy };