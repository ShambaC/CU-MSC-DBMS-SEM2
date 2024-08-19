function getUID(length) {
    let res = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < length; i++) {
        res += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return res;
}

window.onload = () => {
    const sellerID = document.getElementById("seller-id");
    sellerID.value = getUID(5);
};