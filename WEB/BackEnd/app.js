const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

app.use(express.static(path.join(__dirname, "../Frontend")));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile("/index.html");
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});

app.post('/insert', (req, res) => {
    console.log(req.body);
    const { empID, empName, empGender, empPosition, doj, deptID, sal, comm} = req.body;

    db.beginTransaction((err) => {
        if (err)    throw err;

        // check if dept exists
        const checkDeptID = "select deptID from dept where deptID = ?";
        db.query(checkDeptID, [deptID], (err, result) => {
            console.log(result);

            if (err) {
                return db.rollback(() => {
                    throw err;
                });
            }

            if (result.length === 0) {
                return db.rollback(() => {
                    res.status(400).send("Department does not exist");
                });
            }

            const sqlInsertEmp = "insert into employee (empID, empName, empGender, empPosition, doj, deptID) values (?, ?, ?, ?, ?, ?)";
            db.query(sqlInsertEmp, [empID, empName, empGender, empPosition, doj, deptID], (err, result) => {
                console.log(result);

                if (err) {
                    return db.rollback(() => {
                        throw err;
                    });
                }

                const sqlInsertSal = "insert into salary (empID, salAmt, commAmt) values (?, ?, ?)";
                db.query(sqlInsertSal, [empID, sal, comm], (err, result) => {
                    console.log(result);

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

                        res.redirect('/success.html');
                    });
                });
            });
        });
    });
});