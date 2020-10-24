
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








// Starts the server to begin listening
app.listen(PORT, function () {
    console.log('App listining on PORT ' + PORT);
  });