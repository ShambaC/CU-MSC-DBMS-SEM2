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
    const { empID, empName, empGender, empPosition, doj, deptID, sal, comm} = req.body;

    db.beginTransaction((err) => {
        if (err)    throw err;

        // check if dept exists
        const checkDeptID = "select deptID from dept where deptID = ?";
        db.query(checkDeptID, [deptID], (err, result) => {

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

                if (err) {
                    return db.rollback(() => {
                        throw err;
                    });
                }

                let da = 0;
                if (empPosition == "Sr. Supervisor") {
                    da = 25;
                }
                else if (empPosition == "Jr. Supervisor") {
                    da = 22;
                }
                else {
                    da = 28;
                }

                const sqlInsertSal = "insert into salary (empID, salAmt, commAmt, da) values (?, ?, ?, ?)";
                db.query(sqlInsertSal, [empID, sal, comm, da], (err, result) => {

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

app.get('/check', (req, res) => {
    const empID = req.query.empID;

    const sqlQuery = "select e.empID, e.empName, e.empGender, e.empPosition, e.doj, d.deptName, s.salAmt, s.commAmt, s.da from employee e, dept d, salary s where e.empID = ? and d.deptID = e.deptID and s.empID = e.empID;";
    
    db.query(sqlQuery, [empID], (err, result) => {
        if (err)    throw err;

        if (result.length === 0) {
            res.status(404).send("Employee not found");
        }
        else {
            res.status(200).json(result);
        }
    });
});


app.get('/getEmp', (req, res) => {
    const sqlGetEmp = "select employee.*, salary.salAmt, salary.commAmt, dept.deptName from employee join dept on employee.deptID = dept.deptID join salary on employee.empID = salary.empID";

    db.query(sqlGetEmp, [], (err, result) => {
        if (err)    throw err;

        res.json(result);
    });
});