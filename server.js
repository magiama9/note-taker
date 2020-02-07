// Dependencies
// =============================================================
const fs = require("fs");
const fsp = require("fs").promises;
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
  let deleteID = req.params.id;

  // Filters array to remove matching ID
  array = array.filter(idx => {
    return idx.id != deleteID;
  });

  // Returns the new array
  res.json(array);
});

// POST REQUEST
app.post("/api/notes", function(req, res) {
  console.log(req.body);
  
  // Pushes new note to the storage array
  array.push(req.body);

  // Assigns each note an id starting with 0.
  // Ids are rewritten each time a new note is added so they remain manageable
  let id = 1;
  array.forEach(idx => {
    idx.id = id;
    id++;
  });

  // Writes the new array to the DB file
  // File is overwritten with the whole array
  // TODO -- Use read and write streams to add smaller chunks of data instead of overwriting the whole file
  fs.writeFile(__dirname + "/db/db.json", JSON.stringify(array), err => {
    if (err) throw err;

    // Return the new array of notes
    res.json(array);
  });
});

// GET REQUEST
app.get("/api/notes", (req, res) => {
  res.json(array);
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