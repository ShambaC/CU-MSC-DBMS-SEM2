const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
	const prodQuery = "select * from production";

	db.query(prodQuery, [], (err, result) => {
		if (err)	throw err;

		res.status(200).json(result);
	});
});

module.exports = router;