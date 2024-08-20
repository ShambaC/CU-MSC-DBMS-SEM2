const express = require('express')
const db = require('../db');
const bodyParser = require('body-parser');

const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });



module.exports = router;