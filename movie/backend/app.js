const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// const db = require("./db");

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../frontend'));

app.use(express.static(path.join(__dirname, "../frontend")));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/actor_input.html'));
});

// app.get('/insert', async (req, res) => {
//     try {
//       const [rows] = await db.query('SELECT title FROM movie');
//       res.setHeader('Content-Type', 'text/html');
//       res.render('actor_input', { options: rows });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching options');
//     }
// });

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});