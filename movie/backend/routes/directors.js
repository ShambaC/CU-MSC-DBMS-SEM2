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