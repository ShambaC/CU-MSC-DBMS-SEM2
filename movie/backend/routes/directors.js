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
 * Route to get all directors data
 * No request query required
 */
router.get('/', (req, res) => {
	const directorQuery = "select * from director";

	db.query(directorQuery, [], (err, result) => {
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
 * -directorName : name of the director
 * -dDOB 	  	 : DOB of the director
 * 
 * How to create a query string and send fetch request ?
 * 
 * const params = new URLSearchParams({
 * 		directorName: "value1",
 * 		dDOB: "value2",
 * });
 * const queryString = params.toString();
 * 
 * // Then call fetch with the created string
 * fetch(`/directors/getMovies?${queryString}`) ....
 * 
 * This will return a JSON with the required data
 */
router.get('/getMovies', (req, res) => {
	const dName = req.query.directorName;
	const dDOB = req.query.dDOB;

	const directorQuery = `select title, year from directed_by where dName="${dName}" and dDOB="${dDOB}"`;
	db.query(directorQuery, [], (err, result) => {
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
 * Route to add director data to database
 */
router.post('/insertDirector', urlencodedParser, (req, res) => {
	const { dName, dDOB, directedMovies } = req.body;

	db.beginTransaction((err) => {
		if (err)	throw err;

		const directorQuery = "insert into director values (?, ?)";
		db.query(directorQuery, [dName, dDOB], (err, result) => {
			if (err) {
				return db.rollback(() => {
					throw err;
				});
			}

			// Movie parsing
			const movieName = directedMovies.split("_")[0];
			const year = directedMovies.split("_")[1];

			const directedQuery = "insert into directed_by values (?, ?, ?, ?)";
			db.query(directedQuery, [movieName, year, dName, dDOB], (err, result) => {
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