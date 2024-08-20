const express = require('express')
const db = require('../db');
const bodyParser = require('body-parser');

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

router.post('/add', urlEncodedParser, (req, res) => {
    const { dID, pID, visitDate, symptoms, diagnosis, meds, onClinic } = req.body;

    const insertHistoryQuery = `insert into history values(?, ?, ?, ?, ?, ?)`;
    db.query(insertHistoryQuery, [pID, dID, visitDate, symptoms, diagnosis, meds], (err, result) => {
        if (err) {
            return db.rollback(() => {
                throw err;
            });
        }

        const presInsertQuery = `insert into prescription values(?, ?, ?, ?)`;
        db.query(presInsertQuery, [pID, visitDate, meds, onClinic], (err, result) => {
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

module.exports = router;