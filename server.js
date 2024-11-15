// server.js
const express = require("express");
const db = require("./database");
const app = express();
const PORT = 3001;

// Serve static files from the "public" folder
app.use(express.static("public"));

// Define an endpoint to retrieve verified halal restaurants
app.get("/api/verified-restaurants", (req, res) => {
  const query = `SELECT * FROM restaurants WHERE halal_verified = 1`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ restaurants: rows });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
