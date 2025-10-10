// Solo ricerca
exports.searchProducts = (req, res) => {
	// Placeholder: restituisce un array vuoto
	res.json({
		data: [],
		message: "Funzione di ricerca non ancora implementata",
	});
};

// Ricerca + paginazione
exports.searchAndPaginateProducts = (req, res) => {
	// Placeholder: restituisce un array vuoto
	res.json({
		data: [],
		message: "Funzione di ricerca e paginazione non ancora implementata",
	});
};
const { connection } = require("../db/db.js");

// Solo paginazione
exports.getPaginatedProducts = (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	const query =
		"SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?";
	const countQuery = "SELECT COUNT(*) AS total FROM products";

	connection.query(query, [limit, offset], (err, products) => {
		if (err) {
			console.error("Errore query prodotti:", err);
			return res
				.status(500)
				.json({ error: "Errore nel recupero dei prodotti" });
		}

		connection.query(countQuery, (err2, countResult) => {
			if (err2) {
				console.error("Errore conteggio prodotti:", err2);
				return res
					.status(500)
					.json({ error: "Errore nel conteggio dei prodotti" });
			}

			const total = countResult[0].total;
			const totalPages = Math.ceil(total / limit);
			const start = offset + 1;
			const end = Math.min(offset + limit, total);

			res.json({
				data: products,
				total,
				page,
				totalPages,
				message: `Visualizzazione ${start}-${end} di ${total} prodotti (pagina ${page} di ${totalPages})`,
			});
		});
	});
};
