const searchBtn = document.getElementById("submit-btn");
searchBtn.addEventListener("click", search);

function search() {
    const empID = document.getElementById("empID").value;

    if (empID && empID.trim() !== '') {
        fetch("/check?empID=" + empID)
            .then(res => {
                if (res.status == 404) {
                    const detailsDiv = document.getElementById("details-div");
                    detailsDiv.innerHTML = "";
                    alert("Employee not found");
                }
                else if (res.status == 200) {
                    return res.json();
                }
            })
            .then(data => {
                const emp = data[0];
                const detailsDiv = document.getElementById("details-div");

                const totalSalary = emp.salAmt + emp.commAmt + Math.trunc(emp.salAmt * emp.da / 100);

                detailsDiv.innerHTML += `
                    <h1 class="text-2xl">
                        Employee details
                    </h1>`;

                detailsDiv.innerHTML += `
                    <ul class="list-none">
                        <li>Employee ID &emsp;&emsp;&emsp;&emsp;: ${emp.empID}</li>
                        <li>Employee Name &emsp;&emsp;&nbsp;: ${emp.empName}</li>
                        <li>Employee Gender &emsp;&ensp; : ${emp.empGender}</li>
                        <li>Employee Position &emsp;&nbsp; : ${emp.empPosition}</li>
                        <li>Date of Joining &emsp;&emsp;&ensp;&nbsp; : ${emp.doj.substring(0, 10)}</li>
                        <li>Department Name &emsp;&nbsp; : ${emp.deptName}</li>
                        <li>Total Salary &emsp;&emsp;&emsp;&emsp;&ensp; : ${totalSalary}</li>
                    </ul>
                `
            });
    }
}