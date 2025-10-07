const { APP_PORT } = process.env;
const db_connection = require("./db/db.js");
console.log("starting up index.js"); //debug
//importing express
const express = require("express");
const imagePathMiddleware = require('./middlewares/imagePathMiddleware.js')
const slugMiddleware = require('./middlewares/imagePathMiddleware.js')
const app = express();

app.use(express.static("public"));

// MODIFICA: serve immagini da assets/public/imgs tramite /images

// app.use('/images', express.static(path.join(__dirname, 'assets/public/imgs')));

app.use(express.json());
const setImagePath = require("./middlewares/imagePathMiddleware.js");
const setSlugPath = require("./middlewares/slugMiddleware.js");
app.use(imagePathMiddleware);
app.use(slugMiddleware);
const cors = require("cors");
const corsOptions = {
	origin: "http://localhost:5173",
	methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));

// Import routes
const categoriesRoutes = require("./routes/categoriesRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const ordersRoutes = require("./routes/ordersRoutes.js");
const discountCodesRoutes = require("./routes/discountCodesRoutes..js");
// const orderItemsRoutes = require("./routes/orderItemsRoutes.js");

// routes usage
app.use("/orders", ordersRoutes);
app.use("/categories", categoriesRoutes);
app.use("/products", productsRoutes);
app.use("/discount-codes", discountCodesRoutes);
app.use('/products', productsRoutes, setImagePath);
app.use('/products', productsRoutes, setSlugPath);
// app.use("/order-items", orderItemsRoutes);

app.get("/", (req, res) => {
	res.send("API server main page");
});


app.listen(APP_PORT, () => {
			console.log(`API server listening on port ${APP_PORT}`);
		});