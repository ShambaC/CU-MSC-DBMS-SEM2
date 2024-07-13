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
		
						res.redirect('/index.html');
					});
				}
			});
		});
	});
});

module.exports = router;