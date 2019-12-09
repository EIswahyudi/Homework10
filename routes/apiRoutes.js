const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
var noteText = require("../db/noteText");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(noteText);
    });

    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        let lastId = noteText[noteText.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId;

        console.log("Req.body:", req.body);
        noteText.push(newNote);

        writeFileAsync("../db/noteText.json", JSON.stringify(noteText)).then(function () {
            console.log("Notesupdated");
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", function (req, res) {
        let chosenId = parseInt(req.params.id);

        for (let i = 0; i < noteText.length; i++) {
            if (chosenId === noteText[i].id) {
                noteText.splice(i, 1);

                let noteJSON = JSON.stringify(noteText, null, 2);

                writeFileAsync("../db/noteText.json", noteJSON).then(function () {
                    console.log("Notes deleted");
                });
            }
        }
        res.json(noteText);
    });
};

