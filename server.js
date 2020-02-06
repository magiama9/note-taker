// Dependencies
// =============================================================
const fs = require("fs");
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// HOMEPAGE GET REQUEST
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// NOTES GET REQUEST
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// DELETE REQUEST
app.delete("/api/notes/:id", function(req, res) {
  console.log(req.params);
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST REQUEST
app.post("/api/notes", function(req, res) {
  return res.json(restaurant);
});

// GET REQUEST
app.get("/api/notes", function(req, res) {
  return res.json(tables);
});

// Reservation Table Storage
const tables = [];


// Create New Reservation - takes in JSON input
app.post("/api/reserve", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newResy = req.body;

  // Reduces available seats by the tablesize coerced to a number
  restaurant.seats -= +newResy.size;

  console.log(newResy);

  tables.push(newResy);
  res.json(tables);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
