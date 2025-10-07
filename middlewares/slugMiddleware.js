// Middleware for setting image path on the request object
const db_connection = require("./db/db.js");
const query = "SELECT product_id, name, brand FROM products"

const setSlugPath = (req,res,next) => {
  req.imagePath = `${req.protocol}://${req.get('host')}/imgs/`;
  next();
  }

  module.exports=setSlugPath;