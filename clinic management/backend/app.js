const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./db');
const app = express();

const urlEncodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static(path.join(__dirname, "../frontend/")));

// ROUTES ------------------------------------------------------------

const doctorRoute = require('./routes/doctor');
const receiptRoute = require('./routes/receipt');
const prescriptionRoute = require('./routes/prescription');
const patientRoute = require('./routes/patient');
const historyRoute = require('./routes/history');

app.use('/doctor', doctorRoute);
app.use('/receipt', receiptRoute);
app.use('/prescription', prescriptionRoute);
app.use('/patient', patientRoute);
app.use('/history', historyRoute);

//--------------------------------------------------------------------

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});