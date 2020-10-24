
const express = require('express');
const path = require("path");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

app.post('/api/notes', (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
  };
  newNote.id = Math.floor(Math.random() * Date.now());

  let notes = fs.readFileSync('./db/db.json');
  let parsedNote = JSON.parse(notes);
  parsedNote.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(parsedNote));
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  let id = req.params.id;

  fs.readFile('./db/db.json', 'utf-8', (err, notesDetail) => {
    let note = JSON.parse(notesDetail);
    let newNotesDetail = note.filter((note) => note.id != id);
    fs.writeFile(
      './db/db.json',
      JSON.stringify(newNotesDetail, null, 2),
      (err) => {
        if (err) throw err;
        res.send(newNotesDetail);
      }
    );
  });
});


app.listen(PORT, function () {
    console.log('App listining on PORT ' + PORT);
  });