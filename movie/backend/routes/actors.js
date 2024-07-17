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
 * Route to get all actors data
 * No request query required
 */
router.get('/', (req, res) => {
	const actorQuery = "select * from actor";

	db.query(actorQuery, [], (err, result) => {
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
 * -actorName : name of the actor
 * -aDOB 	  : DOB of the actor
 * 
 * How to create a query string and send fetch request ?
 * 
 * const params = new URLSearchParams({
 * 		actorName: "value1",
 * 		aDOB: "value2",
 * });
 * const queryString = params.toString();
 * 
 * // Then call fetch with the created string
 * fetch(`/actors/getMovies?${queryString}`) ....
 * 
 * This will return a JSON with the required data
 */
router.get('/getMovies', (req, res) => {
	const aName = req.query.actorName;
	const aDOB = req.query.aDOB;

	const actorQuery = `select title, year, role from acted_by where aName="${aName}" and aDOB="${aDOB}"`;
	db.query(actorQuery, [], (err, result) => {
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
 * Route for getting actor quotes for a particular movie
 * Send following fields as query
 * -actorName 	: name of the actor
 * -aDOB 	  	: DOB of the actor
 * -movieName 	: title of the movie
 * -year		: year of the movie release
 */
router.get('/getQuotes', (req, res) => {
	const aName = req.query.actorName;
	const aDOB = req.query.aDOB;
	const movieName = req.query.movieName;
	const year = req.query.year;

	const quoteQuery = `select qText from quote where aName="${aName}" and aDOB="${aDOB}" and title="${movieName}" and year=${year}`;
	db.query(quoteQuery, [], (err, result) => {
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
 * Route to add actor data to database
 */
router.post('/insertActor', urlencodedParser, (req, res) => {
	const { aName, aDOB, acted_by } = req.body;

	db.beginTransaction((err) => {
		if (err) throw err;

		const actorQuery = "insert into actor values (?, ?)";
		db.query(actorQuery, [aName, aDOB], (err, result) => {
			if (err) {
				return db.rollback(() => {
					throw err;
				});
			}

			var actedQuery = "";
			if (Array.isArray(acted_by)) {
				actedQuery = "insert into acted_by (title, year, aName, aDOB, role) values ";
				acted_by.forEach((movie, index, array) => {
					const movieName = movie.split("_")[0];
					const year = movie.split("_")[1];

					const role = req.body[`role_${movieName}(${year})`];

					actedQuery += `("${movieName}", ${year}, "${aName}", "${aDOB}", "${role}")`;

					if (index !== array.length - 1) {
						actedQuery += ",";
					}
				});
			}
			else {
				const movieName = acted_by.split("_")[0];
				const year = acted_by.split("_")[1];

				const role = req.body[`role_${movieName}(${year})`];

				actedQuery = `insert into acted_by values ("${movieName}", ${year}, "${aName}", "${aDOB}", "${role}")`;
			}

			db.query(actedQuery, [], (err, result) => {
				if (err) {
					return db.rollback(() => {
						throw err;
					});
				}

				var anyQuote = false;
				for (const [key, val] of Object.entries(req.body)) {
					if (key.startsWith("quote_")) {
						anyQuote = true;
						break;
					}
				}

				if (anyQuote) {
					var quoteQuery = "";
					if (Array.isArray(acted_by)) {
						actedQuery = "insert into quote (qText, aName, aDOB, title, year) values ";
						var numQuotes = 0;
						acted_by.forEach((movie, index, array) => {
							const movieName = movie.split("_")[0];
							const year = movie.split("_")[1];
		
							let quote = "";
							let isQuoteFound = false;
							for (const [key, val] of Object.entries(req.body)) {
								if (key.startsWith(`quote_${movieName}(${year})`)) {
									isQuoteFound = true;
									quote = val;
									break;
								}
							}

							if (isQuoteFound) {
								numQuotes++;
								if(numQuotes > 1) {
									quoteQuery += ",";
								}

								quoteQuery += `("${quote}", "${aName}", "${aDOB}", "${movieName}", ${year})`;
							}
						});
					}
					else {
						const movieName = acted_by.split("_")[0];
						const year = acted_by.split("_")[1];
		
						const quote = req.body[`quote_${movieName}(${year})`];
		
						quoteQuery = `insert into quote values ("${quote}", "${aName}", "${aDOB}", "${movieName}", ${year})`;
					}

					db.query(quoteQuery, [], (err, result) => {
						if (err) {
							return db.rollback(() => {
								throw err;
							})
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
					db.commit((err) => {
						if (err) {
							return db.rollback(() => {
								throw err;
							});
						}
		
						res.redirect('/main_index.html');
					});
				}
			});
		});
	});
});

module.exports = router;