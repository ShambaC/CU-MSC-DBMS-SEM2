const dIDdrop = document.getElementById("dID");
const pIDdrop = document.getElementById("pID");
const dateDrop = document.getElementById("visitDate");

pIDdrop.onchange = () => {
    let patientID = pIDdrop.value;
    addDates(patientID);
}

window.onload = () => {
    fetch('/doctor')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                var optionText = `<option value=${element.dID}>${element.dID}</option>`;
                dIDdrop.innerHTML += optionText;
            });
        });

    fetch('/patient')
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                var optionText = `<option value=${element.pID}>${element.pID}</option>`;
                pIDdrop.innerHTML += optionText;
            });

            addDates(pIDdrop.value);
        });

}

function addDates(pID) {
    fetch(`/receipt/patient?pID=${pID}`)
        .then(res => res.json())
        .then(data => {
            dateDrop.innerHTML = ``;
            data.forEach(element => {
                var optionText = `<option value=${element.visitDate.substring(0, 10)}>${element.visitDate.substring(0, 10)}</option>`;
                dateDrop.innerHTML += optionText;
            });
        });
}