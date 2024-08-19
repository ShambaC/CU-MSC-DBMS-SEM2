const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db');

const app = express();

app.use(express.static(path.join(__dirname, "../frontend/")));

const sellerRoute = require('./routes/seller');

app.use('/seller', sellerRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000/");
});