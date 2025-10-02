const {DB_USER, DB_HOST, DB_PWD, DB_PORT, DB_NAME}= process.env;
//we import mysql2 modules
const mysql = require("mysql2")

// queries used to create the db:

// Connessione al database
const pool = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME
});

pool.connect((err)=>{
  if (err) console.log("connection error",err)
  else {
    seedCategories()
  };
  
})

const seedCategories= () => {
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
  categories.map((category,index) =>{
    pool.query(
        'INSERT INTO categories (name, icon) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=name',
        [category.name, category.icon],(err)=>{
          if (err) console.log("query failed",err)
          else console.log(`query ${index+1} of ${categories.length}  succeded`)
        }
      );
  })
  
}

