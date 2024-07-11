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
	const movieQuery = "select title, year from movies";

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

app.get('/genres', (req, res) => {
	const genreQuery = "select * from genre";

	db.query(genreQuery, [], (err, result) => {
		if (err) throw err;

		res.status(200).json(result);
	})
});

app.post('/insertActor', urlencodedParser, (req, res) => {
    
});

app.post('/insertMovie', urlencodedParser, (req, res) => {
	const { movieName, releaseYear, movieDuration, plotoutline, productioncompany, genre } = req.body;
	const year = releaseYear.substring(0, 4);

	db.beginTransaction((err) => {
		if (err) throw err;

		const insertQueryA = "insert into movies values (?, ?, ?, ?, ?)";
		db.query(insertQueryA, [movieName, year, movieDuration, plotoutline, productioncompany], (err, result) => {
			if (err) {
				return db.rollback(() => {
					throw err;
				});
			}

			if (Array.isArray(genre)) {
				const genreQuery = "insert into movie_genre (title, year, genreName) values ";
				genre.forEach((type, index, array) => {
					genreQuery += `(${movieName}, ${year}, ${type})`;
					
					if (index !== array.length - 1) {
						genreQuery += ",";
					}
				});

				db.query(genreQuery, [], (err, result) => {
					if (err) {
						return db.rollback(() => {
							throw err;
						});
					}

					db.commit((err) => {
						if (err) {
							return db.rollback(() => {
								throw err;
							});
						}
		
						res.redirect('/index.html');
					});
				});
			}
			else {
				const genreQuery = "insert into movie_genre values (?, ?, ?)"
				db.query(genreQuery, [movieName, year, genre], (err, result) => {
					if (err) {
						return db.rollback(() => {
							throw err;
						});
					}

					db.commit((err) => {
						if (err) {
							return db.rollback(() => {
								throw err;
							});
						}
		
						res.redirect('/index.html');
					});
				});
			}
			
		});
	});
});

app.post('/insertDirector', urlencodedParser, (req, res) => {
	
});

app.listen(5000, () => {
  	console.log("Server running at http://localhost:5000");
});