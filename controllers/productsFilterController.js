const { connection } = require("../db/db.js");

// Ricerca + paginazione
exports.searchAndPaginateProducts = (req, res) => {
	const term = req.query.term ? req.query.term.trim() : "";
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;

	if (!term) {
		return res.status(400).json({ error: "Parametro 'term' obbligatorio" });
	}

	const likeTerm = `%${term}%`;
	const query =
		"SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
	const countQuery =
		"SELECT COUNT(*) AS total FROM products WHERE name LIKE ? OR description LIKE ?";

	connection.query(
		query,
		[likeTerm, likeTerm, limit, offset],
		(err, products) => {
			if (err) {
				console.error("Errore query prodotti:", err);
				return res
					.status(500)
					.json({ error: "Errore nel recupero dei prodotti" });
			}

			connection.query(
				countQuery,
				[likeTerm, likeTerm],
				(err2, countResult) => {
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
						message: `Visualizzazione ${start}-${end} di ${total} prodotti trovati per '${term}' (pagina ${page} di ${totalPages})`,
					});
				}
			);
		}
	);
};
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
