const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const db = require("./db");
const app = express();


app.set('views', path.join(__dirname, '../frontend'));

app.use(express.static(path.join(__dirname, "../frontend")));

// Middleware
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  	res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/movies', (req, res) => {
	const movieQuery = "select title, year from movie";

	db.query(movieQuery, [], (err, result) => {
		if (err)	throw err;

		if (result.length === 0) {
			res.sendStatus(404);
		}
		else {
			res.status(200).json(result);
		}
	});
});

app.get('/productions', (req, res) => {
	const prodQuery = "select * from production";

	db.query(prodQuery, [], (err, result) => {
		if (err)	throw err;

		res.status(200).json(result);
	});
});

app.post('/insertActor', urlencodedParser, (req, res) => {
    
});

app.listen(5000, () => {
  	console.log("Server running at http://localhost:5000");
});