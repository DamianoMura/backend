const { connection } = require("../db/db.js");

// Ricerca e filtro prodotti per nome/descrizione/categoria con paginazione e ordinamento opzionale (nome, prezzo, categoria)
exports.filterProducts = (req, res) => {
	const term = req.query.term ? req.query.term.trim() : "";
	let page = Number.parseInt(req.query.page);
	let limit = Number.parseInt(req.query.limit);
	if (isNaN(page) || page < 1) page = 1;
	if (isNaN(limit) || limit < 1) limit = 10;
	const offset = (page - 1) * limit;

	if (!term) {
		return res.status(400).json({ error: "Parametro 'term' obbligatorio" });
	}

	const likeTerm = `%${term}%`;
	let sort;
	switch (req.query.sort) {
		case "price_asc":
			sort = "price ASC";
			break;
		case "price_desc":
			sort = "price DESC";
			break;
		case "category_asc":
			sort = "category_name ASC, name ASC";
			break;
		case "category_desc":
			sort = "category_name DESC, name ASC";
			break;
		default:
			sort = "name ASC";
	}
	const query = `SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`;
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

			// Conversione price a numero
			const productsFixed = products.map((p) => ({
				...p,
				price: p.price !== undefined ? Number(p.price) : p.price,
			}));

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
						data: productsFixed,
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

// Restituisce tutti i prodotti con paginazione e ordinamento opzionale (nome, prezzo, categoria)
exports.listProducts = (req, res) => {
	let page = Number.parseInt(req.query.page);
	let limit = Number.parseInt(req.query.limit);
	if (isNaN(page) || page < 1) page = 1;
	if (isNaN(limit) || limit < 1) limit = 10;
	const offset = (page - 1) * limit;

	let sort;
	switch (req.query.sort) {
		case "price_asc":
			sort = "price ASC";
			break;
		case "price_desc":
			sort = "price DESC";
			break;
		case "category_asc":
			sort = "category_name ASC, name ASC";
			break;
		case "category_desc":
			sort = "category_name DESC, name ASC";
			break;
		default:
			sort = "name ASC";
	}
	const query = `SELECT * FROM products ORDER BY ${sort} LIMIT ? OFFSET ?`;
	const countQuery = "SELECT COUNT(*) AS total FROM products";

	connection.query(query, [limit, offset], (err, products) => {
		if (err) {
			console.error("Errore query prodotti:", err);
			return res
				.status(500)
				.json({ error: "Errore nel recupero dei prodotti" });
		}

		// Conversione price a numero
		const productsFixed = products.map((p) => ({
			...p,
			price: p.price !== undefined ? Number(p.price) : p.price,
		}));

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
				data: productsFixed,
				total,
				page,
				totalPages,
				message: `Visualizzazione ${start}-${end} di ${total} prodotti (pagina ${page} di ${totalPages})`,
			});
		});
	});
};
