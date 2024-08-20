function getUID(length) {
    let res = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < length; i++) {
        res += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return res;
}

window.onload = () => {
    const sellerID = document.getElementById("item-id");
    sellerID.value = getUID(5);

    fetch('/seller')
        .then(res => res.json())
        .then(data => {
            const sellerSelect = document.getElementById('seller-id');
            data.forEach(element => {
                let optText = `<option value="${element.sID}">${element.sID}</option>`;
                sellerSelect.innerHTML += optText;
            });
        });
};