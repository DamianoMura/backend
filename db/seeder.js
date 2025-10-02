const mysql = require("mysql2");
const { DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME } = process.env;

// Connessione al database
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME
}).promise();

async function seedCategories() {
  const categories = [
    { name: 'Laptop', icon: 'laptop-icon.jpg' },
    { name: 'Phones', icon: 'phone-icon.jpg' },
    { name: 'Headsets', icon: 'headset-icon.jpg' },
    { name: 'Gaming Chairs', icon: 'gamingchair-icon.jpg' },
    { name: 'Gaming Tables', icon: 'gamingtable-icon.jpg' },
    { name: 'Desktops', icon: 'desktop-icon.jpg' },
    { name: 'Mouse', icon: 'mouse-icon.jpg' },
    { name: 'Keyboards', icon: 'keyboard-icon.jpg' },
    { name: 'Monitor', icon: 'monitor-icon.jpg' },
    { name: 'Cases', icon: 'case-icon.jpg' },
    { name: 'Speakers', icon: 'speaker-icon.jpg' }
  ];

  for (const category of categories) {
    try {
      await pool.query(
        'INSERT INTO categories (name, icon) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=name',
        [category.name, category.icon]
      );
      console.log(`Seeded category: ${category.name}`);
    } catch (err) {
      console.error(`Error seeding category ${category.name}:`, err);
    }
  }
  await pool.end();
}

seedCategories();