const connection = require("../db/db.js");

// Index: restituisce tutte le categorie
const index = (req, res) => {
  const sql = "SELECT * FROM categories";
  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Errore nell'esecuzione della query: " + err });
    res.json(results);
  });
};

// Show: restituisce una singola categoria per id
const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM categories WHERE category_id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Errore nell'esecuzione della query: " + err });
    if (results.length === 0)
      return res.status(404).json({ error: "Categoria non trovata!" });
    res.json(results[0]);
  });
};

// Create: aggiunge una nuova categoria
const create = (req, res) => {
  const { name, icon } = req.body;
  const sql = "INSERT INTO categories (name, icon) VALUES (?, ?)";
  connection.query(sql, [name, icon], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Errore nell'inserimento della categoria: " + err });
    res.status(201).json({ id: result.insertId, name, icon });
  });
};

// Update: aggiorna una categoria esistente
const update = (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  const sql = "UPDATE categories SET name = ?, icon = ? WHERE category_id = ?";
  connection.query(sql, [name, icon, id], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Errore nell'aggiornamento della categoria: " + err });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Categoria non trovata!" });
    res.json({ id, name, icon });
  });
};

// Destroy: elimina una categoria
const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE category_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ error: "Errore nell'eliminazione della categoria: " + err });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Categoria non trovata!" });
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