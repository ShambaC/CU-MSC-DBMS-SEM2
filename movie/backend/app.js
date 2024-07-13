const express = require("express");
const path = require("path");

const app = express();

app.set('views', path.join(__dirname, '../frontend'));

app.use(express.static(path.join(__dirname, "../frontend")));

//-----------------------------------------
// Routes
//-----------------------------------------

const movieRoute = require('./routes/movies');
const actorRoute = require('./routes/actors');
const directorRoute = require('./routes/directors');
const productionRoute = require('./routes/productions');
const genreRoute = require('./routes/genres');

app.use('/movies', movieRoute);
app.use('/actors', actorRoute);
app.use('/directors', directorRoute);
app.use('/productions', productionRoute);
app.use('/genres', genreRoute);

//------------------------------------------

app.get('/', (req, res) => {
  	res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(5000, () => {
  	console.log("Server running at http://localhost:5000");
});