const addItemBtn = document.getElementById("add-item-btn");
const bidBtn = document.getElementById("add-bid-btn");

fetch('/seller')
    .then(res => {
        if (res.status == 404) {
            addItemBtn.ariaDisabled = true;
            addItemBtn.classList.add("disabled");
        }
        else if (res.status == 200) {
            addItemBtn.ariaDisabled = false;
            addItemBtn.classList.remove("disabled");
        }
    });

fetch('/item')
    .then(res => {
        if (res.status == 404) {
            bidBtn.ariaDisabled = true;
            bidBtn.classList.add("disabled");
        }
        else if (res.status == 200) {
            bidBtn.ariaDisabled = false;
            bidBtn.classList.remove("disabled");
        }
    });