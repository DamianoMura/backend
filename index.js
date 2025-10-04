const { APP_PORT } = process.env;
const db_connection = require("./db/db.js");
console.log("starting up index.js"); //debug
//importing express
const express = require("express");
const { connection, connectAndSelectDB } = require("./db/db");
const createTables = require("./db/nerdNest_ER_db");

const app = express();

app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));

// Import routes
const categoriesRoutes = require("./routes/categories");
const productsRoute = require("./routes/productsRoute");
// ...altre routes

app.use("/categories", categoriesRoutes);
app.use("/products", productsRoute);
// ...altre routes

app.get("/", (req, res) => {
  res.send("API server main page");
});

// Sequenza: connessione -> creazione DB -> creazione tabelle -> avvio server
connectAndSelectDB(() => {
  createTables(connection, () => {
    app.listen(APP_PORT, () => {
      console.log(`API server listening on port ${APP_PORT}`);
    });
  });
});
