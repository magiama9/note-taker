// Dependencies
// =============================================================
const fs = require("fs");
const fsp = require("fs").promises;
const express = require("express");
const path = require("path");
const util = require("util");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Note Array for temporary Storage
let array = [];

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
  console.log(req.body);
  array.push(req.body);
  fs.writeFile(__dirname + "/db/db.json", JSON.stringify(array), err => {
    if (err) throw err;
  });
});

// GET REQUEST
app.get("/api/notes", async (req, res) => {
  readMe(await res);
});

// Reads DB file for later modification
fs.readFile(__dirname + "/db/db.json", (err, data) => {
  array = JSON.parse(data);
  console.log(array);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

const readMe = res => {
  fs.readFile(__dirname + "/db/db.json", async (err, data) => {
    array = await JSON.parse(data);
    return res.json(array);
  });
};
