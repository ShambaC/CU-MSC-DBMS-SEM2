const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auction',
    multipleStatements: true
});

conn.connect((err) => {
    if (err) {
        throw err;
    }

    console.log("Connected to Database");
});

module.exports = conn;