const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", deleteEmp);

function deleteEmp() {
    const empID = document.getElementById("empID").value;

    if (empID && empID.trim() !== '') {
        fetch('/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `empID=${empID}`,
        })
        .then(res => {
            if (res.status == 404) {
                alert("Employee does not exist");
            }
            else if (res.status == 200) {
                alert("Employee successfully deleted");
            }
            else if (res.status == 500) {
                alert("Internal Server error");
            }
        });
    }
}