const { connection } = require("../db/db.js");
const { sendConfirmationEmail } = require("../service/mailer");

// Handler to get all orders
const index = (req, res) => {
    connection.query("SELECT * FROM orders", (err, results) => {
        if (err)
            return res.status(500).json({ error: "Query failed", details: err });
        res.status(200).json(results);
    });
};

// Handler to get a single order by id
const show = (req, res) => {
    const { id } = req.params;

    connection.query(
        "SELECT order_id, customer_name, customer_email, address_street, address_street_number, address_city, postal_code, country, billing, order_date, discount_code_id FROM orders WHERE order_id = ?",
        [id],
        (err, orders) => {
            if (err) {
                return res.status(500).json({ error: "Query orders failed", details: err });
            }
            if (!orders.length) {
                return res.status(404).json({ error: "Order not found!" });
            }

            const order = orders[0];

            connection.query(
                "SELECT order_item_id, product_id, name, description, specs, price, quantity FROM order_items WHERE order_id = ?",
                [id],
                (err, items) => {
                    if (err) {
                        return res.status(500).json({ error: "Query order_items failed", details: err });
                    }

                    const result = {
                        order_id: order.order_id,
                        customer_name: order.customer_name,
                        customer_email: order.customer_email,
                        address_street: order.address_street,
                        address_street_number: order.address_street_number,
                        address_city: order.address_city,
                        postal_code: order.postal_code,
                        country: order.country,
                        billing: order.billing,
                        order_date: order.order_date,
                        discount_code_id: order.discount_code_id,
                        items: items,
                    };

                    return res.status(200).json(result);
                }
            );
        }
    );
};

// Handler to create a new order
const create = (req, res) => {
    const {
        customer_name,
        customer_email,
        address_street,
        address_street_number,
        address_city,
        postal_code,
        country,
        discount_code_id,
        items,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            error: "Il carrello è vuoto. Nessun ordine effettuato.",
        });
    }

    const order_date = new Date();
    const billing = `${order_date.getFullYear()}-${order_date.getTime() / 90}`;

    connection.query(
        "INSERT INTO orders (customer_name, customer_email, address_street, address_street_number, address_city, postal_code, country, billing, order_date, discount_code_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            customer_name,
            customer_email,
            address_street,
            address_street_number,
            address_city,
            postal_code,
            country,
            billing,
            order_date,
            discount_code_id,
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Errore inserimento ordine", details: err });
            }

            const order_id = result.insertId;

            const insertItems = items.map((item) => {
                return new Promise((resolve, reject) => {
                    connection.query(
                        "INSERT INTO order_items (order_id, product_id, name, description, specs, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        [
                            order_id,
                            item.product_id,
                            item.name,
                            item.description,
                            item.specs,
                            item.price,
                            item.quantity,
                        ],
                        (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        }
                    );
                });
            });

            Promise.all(insertItems)
                .then(async () => {
                    await sendConfirmationEmail(customer_email, customer_name);

                    res.status(201).json({
                        id: order_id,
                        customer_name,
                        customer_email,
                        address_street,
                        address_street_number,
                        address_city,
                        postal_code,
                        country,
                        billing,
                        order_date,
                        discount_code_id,
                        items,
                    });
                })
                .catch((err) => {
                    res.status(500).json({ error: "Errore inserimento articoli", details: err });
                });
        }
    );
};

module.exports = { index, show, create };
