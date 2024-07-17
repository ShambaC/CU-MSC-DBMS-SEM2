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
 * Route for report 1 from assignment
 * Request query should have the following fields
 * -year_l : lower limit of release year
 * -year_u : upper limit of release year
 * 
 * How to create a query string and send fetch request ?
 * 
 * const params = new URLSearchParams({
 * 		year_l: "value1",
 * 		year_u: "value2",
 * });
 * const queryString = params.toString();
 * 
 * // Then call fetch with the created string
 * fetch(`/reports/1?${queryString}`) ....
 * 
 * This will return a JSON with the required data
 */
router.get('/1', (req, res) => {
    const year_l = req.query.year_l;
    const year_u = req.query.year_u;

    const movieQuery = `select m.title, m.year, m.duration, m.plot_outline, m.pName, d.dName ,g.genreName from movies m, movie_genre g, directed_by d where	m.title = g.title and m.year = g.year and m.title = d.title and m.year = d.year and m.year > ${year_l} and m.year < ${year_u} order by m.year, g.genreName;`;
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
 * route for report 2
 * Request query should have the following fields
 * -pName : production company name
 */
router.get('/2', (req, res) => {
    const pName = req.query.pName;

    const movieQuery = `select m.title, m.year, m.duration, m.plot_outline, m.pName, g.genreName, d.dName from movies m, movie_genre g, directed_by d where	m.title = g.title and m.year = g.year and m.title = d.title and m.year = d.year and m.pName = "${pName}" order by	g.genreName, d.dName;`;
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

module.exports = router;