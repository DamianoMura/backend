
// const db_connection = require('../db/db')
const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")
//queries used to create the db:

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME
})

connection.connect((err)=>{
  if(err) throw err;
  console.log(`mysql connected to ${connection.config.host}:${connection.config.port}/${connection.config.database}`);
});
//connessione creata

// console.log(db_connection)
const allProducts = (req,res) =>{
const query = "SELECT * FROM products";
connection.query(query, (err, results)=>{
  if(err) return res.status(500).json({error: "query failed"});
  console.log(results);
  res.status(200).json(results); 

})
}

const showProduct = (req,res) =>{
  const { id } = req.params;
  const query = `SELECT * FROM products WHERE product_id=?`;
  connection.query(query,[id], (err, results)=>{
    if (err) return  res.status(500).json({message: "query failed" , error : err});
    res.status(201).json(results);
  })
}

const addProduct = (req,res) =>{
  const { name, brand, description, specs, price, stock_quantity, image_url, category_id } = req.body;
  const sql = "INSERT INTO products (name, brand, description, specs, price, stock_quantity, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [name, brand, description, specs, price, stock_quantity, image_url, category_id], (err, result) => {
    if (err) console.log(err)
      return res.status(500).json({ error: "Product Insert error: " + err });
    res.status(201).json({name, brand, description, specs, price, stock_quantity, image_url, category_id} );
    
  });
}

const modifyProduct = () =>{
  const { id } = req.params;
  const { name, brand, description, specs, price, stock_quantity, image_url, category_id } = req.body;
  const sql =
    "UPDATE products SET name = ?, brand = ?, description = ?, specs = ?, price = ?, specs = ?, stock_quantity = ?, image_url = ?, category_id = ? WHERE code_id = ?";
  connection.query(
    sql,
    [name, brand, description, specs, price, stock_quantity, image_url, category_id, id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Product Update error: " + err });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Product not found!" });
      res.json({ id, code, discount_percent, valid_from, valid_until });
    }
  );
}

const deleteProduct = (req, res) =>{
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE product_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Product Delete error: " + err });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Product not found!" });
    res.sendStatus(204);
  });
}

const productPerCategory = (category_id) => {

}

const bestSellers = () => {

}
 
const latestArrivals = () => {

} 

const update = (req, res) => {

};



module.exports = {allProducts, showProduct, addProduct, modifyProduct, deleteProduct, productPerCategory, bestSellers, latestArrivals}