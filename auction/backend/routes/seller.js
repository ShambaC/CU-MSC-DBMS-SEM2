const express = require('express')
const bodyParser = require('body-parser')

const db = require('../db')
const router = express.Router();

const urlEncodedParser = bodyParser.urlencoded({extended: true});

router.get('/', (req, res) => {
    const getQuery = "select * from seller";
    db.query(getQuery, [], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length === 0) {
            res.sendStatus(404);
        }
        else {
            res.status(200).json(result)
        }
    });
});

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