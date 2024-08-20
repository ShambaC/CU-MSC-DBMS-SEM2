const express = require('express')
const db = require('../db');
const bodyParser = require('body-parser');

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

router.get('/patient', urlEncodedParser, (req, res) => {
    const pID = req.query.pID;

    const queryString = "select * from receipt where pID = ?";
    db.query(queryString, [pID], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length === 0) {
            res.sendStatus(404);
        }
        else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;