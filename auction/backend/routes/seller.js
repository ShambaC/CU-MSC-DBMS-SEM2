const express = require('express')
const bodyParser = require('body-parser')

const db = require('../db')
const router = express.Router();

const urlEncodedParser = bodyParser.urlencoded({extended: true});

router.post('/add-seller', urlEncodedParser, (req, res) => {
    const { sellerId, accNo } = req.body;

    const insertQuery = "insert into seller values (?, ?)";
    db.query(insertQuery, [sellerId, accNo], (err, result) => {
        if (err) {
            return db.rollback(() => {
                throw err;
            });
        }

        db.commit((err) => {
            if (err) {
                db.rollback(() => {
                    throw err;
                });
            }

            res.redirect('/index.html');
        })
    });
});

module.exports = router;