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

/**
 * No request body required
 * Sends all movies and data in the movie table
 */
router.get('/', (req, res) => {
	const movieQuery = "select * from movies";

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

/**
 * Route to get information for one movie
 * Request query should have the following fields
 * -movieName : title of the movie
 * -year 	  : release year of the movie
 * 
 * How to create a query string and send fetch request ?
 * 
 * const params = new URLSearchParams({
 * 		movieName: "value1",
 * 		year: "value2",
 * });
 * const queryString = params.toString();
 * 
 * // Then call fetch with the created string
 * fetch(`/movies/getOne?${queryString}`) ....
 * 
 * This will return a JSON with the required data
 */
router.get('/getOne', (req, res) => {
	const movieName = req.query.movieName;
	const year = req.query.year;

	const movieQuery = `select * from movies where title="${movieName}" and year=${year}`;
	db.query(movieQuery, [], (err, result) => {
		if (err) throw err;

		if (result.length === 0) {
			res.sendStatus(404);
		}
		else {
			res.status(200).json(result);
		}
	});
});

/**
 * Route for getting movie director
 * send request with a query similar to /getOne route above
 */
router.get('/getDirector', (req, res) => {
	const movieName = req.query.movieName;
	const year = req.query.year;

	const movieQuery = `select dName, dDOB from directed_by where title="${movieName}" and year=${year}`;
	db.query(movieQuery, [], (err, result) => {
		if (err) throw err;

		if (result.length === 0) {
			res.sendStatus(404);
		}
		else {
			res.status(200).json(result);
		}
	});
});

/**
 * Route for getting movie genres
 * send request with a query similar to /getOne route above
 */
router.get('/getGenres', (req, res) => {
	const movieName = req.query.movieName;
	const year = req.query.year;

	const movieQuery = `select genreName from movie_genre where title="${movieName}" and year=${year}`;
	db.query(movieQuery, [], (err, result) => {
		if (err) throw err;

		if (result.length === 0) {
			res.sendStatus(404);
		}
		else {
			res.status(200).json(result);
		}
	});
});

/**
 * Route for getting movie actors
 * send request with a query similar to /getOne route above
 */
router.get('/getActors', (req, res) => {
	const movieName = req.query.movieName;
	const year = req.query.year;

	const movieQuery = `select aName, aDOB, role from acted_by where title="${movieName}" and year=${year}`;
	db.query(movieQuery, [], (err, result) => {
		if (err) throw err;

		if (result.length === 0) {
			res.sendStatus(404);
		}
		else {
			res.status(200).json(result);
		}
	});
});

/**
 * Route to add movie data to database
 */
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