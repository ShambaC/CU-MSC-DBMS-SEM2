const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../frontend'));

app.use(express.static(path.join(__dirname, "../frontend")));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/insertActor', (req, res) => {
    
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});