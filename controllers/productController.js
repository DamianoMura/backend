const { connection } = require("../db/db.js");

// Handler to get all products, with sorting/filter support
const allProducts = (req, res) => {
    const { search, sort, cat, order } = req.query;
    let { rpp, page } = req.query;
    rpp = parseInt(rpp);
    page = parseInt(page);

    // Compose WHERE clause dynamically, search only on product name (all words, any order)
    let whereQArr = [];
    if (cat) whereQArr.push(`category_name LIKE '${cat}'`);
    if (search) {
        // Cerca tutte le parole SOLO nel nome prodotto
        const words = search.split(/\s+/).filter(Boolean);
        words.forEach(word => {
            whereQArr.push(`(name LIKE '%${word}%')`);
        });
    }
    let whereQ = '';
    if (whereQArr.length) whereQ = 'WHERE ' + whereQArr.join(' AND ');

    // Compose ORDER BY
    let orderBy = `ORDER BY price`;
    if (order === "price_ASC") orderBy += " ASC";
    else if (order === "price_DESC") orderBy += " DESC";

    // Sorting filters
    if (sort === "latest") orderBy = "ORDER BY created_at DESC";
    else if (sort === "popular") {
        // Popular = join with order_items and group by product
        whereQ = "JOIN nerdnest_db.order_items ON order_items.product_id=products.product_id GROUP BY products.product_id";
        orderBy = "ORDER BY COUNT(order_items.order_item_id) DESC";
    }

    // Pagination logic
    let limitOffset = "";
    if (rpp && !isNaN(rpp)) {
        limitOffset = `LIMIT ${rpp}`;
        if (page && !isNaN(page) && page > 1) {
            limitOffset += ` OFFSET ${(page - 1) * rpp}`;
        }
    }

    // Count total results
    let selectAll = "SELECT products.* FROM products";
    let selectCount = "SELECT COUNT(*) as count FROM products";
    let countQueryPopular = "JOIN nerdnest_db.order_items ON order_items.product_id=products.product_id";

    // Choose count query based on "popular" sort
    let countQuery = sort === "popular"
        ? `${selectCount} ${countQueryPopular} GROUP BY products.product_id`
        : `${selectCount} ${whereQ}`;

    connection.query(countQuery, (err, results) => {
        if (err) return res.status(400).json({ error: "Query failed", details: err });

        // For "popular", results.length is the count, otherwise results[0].count
        let resultCount = sort === "popular" ? results.length : (results[0]?.count || 0);

        // Calculate pages
        let pages = 1;
        if (rpp && resultCount > 0) {
            pages = Math.ceil(resultCount / rpp);
        }

        // Actual data query
        let dataQuery = `${selectAll} ${whereQ} ${orderBy} ${limitOffset}`;
        connection.query(dataQuery, (err, results) => {
            if (err) return res.status(400).json({ error: "Query failed", details: err });

            results.forEach((result) => {
                result.image_url = req.imagePath + result.image_url;
                result.price = parseFloat(result.price);
            });
            res.status(200).json({ results, resultCount, pages });
        });
    });
};

// Handler to get a single product by id
const showProduct = (req, res) => {
    const { slug } = req.params;

    connection.query(
        "SELECT * FROM products WHERE slug = ?",
        [slug],
        (err, results) => {
            if (err)
                return res.status(500).json({ error: "Query failed", details: err });
            if (!results.length)
                return res.status(404).json({ error: "Product not found!" });
            results[0].image_url = req.imagePath + results[0].image_url;
            results[0].price = parseFloat(results[0].price);
            res.status(200).json(results[0]);
        }
    );
};

// Handler to create a new product
const addProduct = (req, res) => {
    const {
        name,
        brand,
        description,
        specs,
        price,
        stock_quantity,
        image_url,
        category_id,
        category_name,
        created_at = new Date(),
    } = req.body;
    let slug =
        brand.toLowerCase().replaceAll(" ", "-").replaceAll(".", "-") +
        "-" +
        name.toLowerCase().replaceAll(" ", "-").replaceAll(".", "-");
    slug = `${slug}`;

    connection.query(
        "INSERT INTO products (name, brand, description, specs, price, stock_quantity, image_url, category_id, category_name, created_at,slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            name,
            brand,
            description,
            specs,
            parseFloat(price),
            stock_quantity,
            image_url,
            category_id,
            category_name,
            created_at,
            slug,
        ],
        (err, result) => {
            if (err)
                return res
                    .status(500)
                    .json({ error: "Product insert error", details: err });
            res.status(201).json({
                id: result.insertId,
                name,
                brand,
                description,
                specs,
                price: parseFloat(price),
                stock_quantity,
                image_url,
                category_id,
                category_name,
                created_at,
                slug,
            });
        }
    );
};

// Handler to update a product by id
const modifyProduct = (req, res) => {
    const { slug } = req.params;
    const {
        name,
        brand,
        description,
        specs,
        price,
        stock_quantity,
        image_url,
        category_id,
        category_name,
        created_at,
    } = req.body;
    connection.query(
        "UPDATE products SET name = ?, brand = ?, description = ?, specs = ?, price = ?, stock_quantity = ?, image_url = ?, category_id = ?,category_name = ?, created_at = ? WHERE slug = ?",
        [
            name,
            brand,
            description,
            specs,
            price,
            stock_quantity,
            image_url,
            category_id,
            category_name,
            created_at,
            slug,
        ],
        (err, result) => {
            if (err)
                return res
                    .status(500)
                    .json({ error: "Product update error", details: err });
            if (!result.affectedRows)
                return res.status(404).json({ error: "Product not found!" });
            res.json({
                name,
                brand,
                description,
                specs,
                price,
                stock_quantity,
                image_url,
                category_id,
                category_name,
                created_at,
            });
        }
    );
};

// Handler to delete a product by id
const deleteProduct = (req, res) => {
    const { slug } = req.params;
    connection.query(
        "DELETE FROM products WHERE slug = ?",
        [slug],
        (err, result) => {
            if (err)
                return res
                    .status(500)
                    .json({ error: "Product delete error", details: err });
            if (!result.affectedRows)
                return res.status(404).json({ error: "Product not found!" });
            res.sendStatus(204);
        }
    );
};

module.exports = {
    allProducts,
    showProduct,
    addProduct,
    modifyProduct,
    deleteProduct,
};
