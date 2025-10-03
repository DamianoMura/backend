const { APP_PORT } = process.env;
const db_connection = require("./db/db.js");
console.log("starting up index.js"); //debug
//importing express
const express = require("express");
//calling the function that creates the process
const app = express();
//lets enable static  assets
app.use(express.static("public"));

//enable json decoding for req.body (body parser)
app.use(express.json());
//cors
const cors = require("cors");
const corsOptions = {
	origin: "http://localhost:5173",
	methods: "GET,POST,PUT,DELETE",
};
// importing categories
const categoriesRoutes = require("./routes/categories");
// importing products
const productsRoute = require("./routes/productsRoute");
// enabling route
app.use("/categories", categoriesRoutes);
// enabling route
app.use("/products", productsRoute);

// importing discount_codes
const discountCodesRoutes = require("./routes/discountCodes.js");
// enabling route
app.use("/discountcodes", discountCodesRoutes);

//main route set
app.get("/", (req, res) => {
	console.log("home page");
	res.send("API server main page");
});

app.use(cors(corsOptions));

app.listen(APP_PORT, () => {
	console.log(`API server listening on port ${APP_PORT}`);
});
