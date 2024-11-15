// database.js
const sqlite3 = require("sqlite3").verbose();

// Open the SQLite database
const db = new sqlite3.Database("./halal.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create the "restaurants" table if it doesn't exist
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT,
      halal_verified BOOLEAN
    );
  `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log('Table "restaurants" is ready.');
      }
    }
  );
});

// Sample function to add a restaurant
function addRestaurant(name, location, halalVerified) {
  db.run(
    `INSERT INTO restaurants (name, location, halal_verified) VALUES (?, ?, ?)`,
    [name, location, halalVerified],
    function (err) {
      if (err) {
        console.error("Error adding restaurant:", err.message);
      } else {
        console.log(`Added restaurant with ID: ${this.lastID}`);
      }
    }
  );
}

// Uncomment these lines to add sample restaurants, then run `node database.js`
addRestaurant("Halal Grill", "Downtown, Toronto", true);
addRestaurant("Burger Halal", "East Side, Toronto", false);
addRestaurant("Spice Halal", "West End, Toronto", true);

module.exports = db;
