const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const db = require("../db");

// MIDDLEWARES
var urlencodedParser = bodyParser.urlencoded({extended: true});

// ROUTES
router.post('/add-food', urlencodedParser, (req, res) => {
    const { name, price, type } = req.body;

    const insertFoodQuery = "insert into catalog values(?, ?, ?)";
    db.query(insertFoodQuery, [name, parseInt(price), type], (err, result) => {
        if (err) {
            return db.rollback(() => {
                throw err;
            });
        }

        db.commit((err) => {
            if (err) {
                throw err;
            }

            res.redirect('/add_food.html');
        });
    });
});

router.get('/get-foods', (req, res) => {

    const getQuery = "select * from catalog";
    db.query(getQuery, [], (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length === 0) {
            res.status(404);
        }
        else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;