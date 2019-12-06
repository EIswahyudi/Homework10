var express = require("express");
var path = require("path");
// var server = http.createServer(handleRequest);

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8585;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [];


// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Displays all characters
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNotes = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNotes.routeName = newNotes.name.replace(/\s+/g, "");
  
    console.log(newNotes);
  
    characters.push(newNotes);
  
    res.json(newNotes);
  });

  // Start our server
app.listen(PORT, function () {
        // Callback triggered when server is successfully listening. Hurray!
    console.log("App listening on PORT " + PORT);
});