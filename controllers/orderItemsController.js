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
const allOrder = (req,res) =>{
const query = "SELECT * FROM order_items";
connection.query(query, (err, results)=>{
  if(err) return res.status(500).json({error: "query failed"});
  console.log(results);
  res.status(200).json(results); 

})
}

const showOrder = (req,res) =>{
  const { id } = req.params;
  const query = `SELECT * FROM order_items WHERE order_item_id=?`;
  connection.query(query,[id], (err, results)=>{
    if (err) return  res.status(500).json({message: "query failed" , error : err});
    res.status(200).json(results);
  })
}

const addOrder = (req,res) =>{

  console.log(req.body);
  const { order_id, product_id, name, description, specs, price, quantity, price_at_purchase } = req.body;
  const sql = "INSERT INTO order_items (order_id, product_id, name, description, specs, price, quantity, price_at_purchase ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [order_id, product_id, name, description, specs, price, quantity, price_at_purchase ], (err, result) => {
    if (err) return res.status(500).json({ error: "Order Insert error: " + err });
      
    res.status(201).json({order_id, product_id, name, description, specs, price, quantity, price_at_purchase } );
    
  });
}

const modifyOrder = () =>{
  const { id } = req.params;
  const { order_id, product_id, name, description, specs, price, quantity, price_at_purchase  } = req.body;
  const sql =
    "UPDATE order_items  SET order_id = ?, product_id = ?, name = ?, description = ?, specs = ?, price = ?, quantity = ?, price_at_purchase = ? WHERE  order_item_id = ?";
  connection.query(
    sql,
    [order_id, product_id, name, description, specs, price, quantity, price_at_purchase , id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Order Update error: " + err });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Order not found!" });
      res.json({ order_id, product_id, name, description, specs, price, quantity, price_at_purchase , id });
    }
  );
}

const deleteOrder = (req, res) =>{
  const { id } = req.params;
  const sql = "DELETE FROM order_items WHERE order_item_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Order Delete error: " + err });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Order not found!" });
    res.sendStatus(204);
  });
}





module.exports = {allOrder , showOrder, addOrder, modifyOrder, deleteOrder}