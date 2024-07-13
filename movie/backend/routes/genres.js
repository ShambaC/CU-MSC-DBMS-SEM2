const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
	const genreQuery = "select * from genre";

	db.query(genreQuery, [], (err, result) => {
		if (err) throw err;

		res.status(200).json(result);
	})
});

module.exports = router;