const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const db = require('../db');

//---------------------------
// MiddleWares
//---------------------------

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();

//---------------------------
// Routes
//---------------------------

router.get('/', (req, res) => {
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

router.post('/insertMovie', urlencodedParser, (req, res) => {
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

			var genreQuery = "";
			if (Array.isArray(genre)) {
				genreQuery = "insert into movie_genre (title, year, genreName) values ";
				genre.forEach((type, index, array) => {
					genreQuery += `("${movieName}", "${year}", "${type}")`;
					
					if (index !== array.length - 1) {
						genreQuery += ",";
					}
				});
			}
			else {
				genreQuery = `insert into movie_genre values ("${movieName}", "${year}", "${genre}")`
			}

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
			
		});
	});
});

module.exports = router;