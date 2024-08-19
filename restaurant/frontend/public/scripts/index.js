function generateID(length) {
    let result = '';
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const orderDetsDiv = document.getElementById("order-items");
const orderVal = document.getElementById("order_value");

window.onload = (event) => {
    const orderIDfield = document.getElementById("order_id");
    orderIDfield.value = generateID(5);

    var addBtns;

    fetch('/food/get-foods')
        .then(res => res.json())
        .then(data => {
            const menuDiv = document.getElementById("menu");
            data.forEach(element => {
                var item = `
                <div class="menu-item">
                    <img src="public/images/${element.type === "food" ? "hamburger.png" : "soda.png"}" alt="food type">
                    <div class="food-details">
                        <span id="name-price">${element.name}, <strong>${element.price}</strong></span>
                        <button class="add-cart-btn" id="${element.name}-${element.price}">Add to Cart</button>
                    </div>
                </div>
                `;
                menuDiv.innerHTML += item;
            });

            addBtns = document.querySelectorAll(".add-cart-btn");
            addBtns.forEach(btnEle => {
                btnEle.addEventListener("click", () => {
                    orderDetsDiv.innerHTML += `
                        <div>
                            <input type="checkbox" name="order-details" value="${btnEle.id}" checked>
                            <label for="order-details">${btnEle.id}</label>
                        </div>
                        `
                    
                    orderVal.value = parseInt(orderVal.value) + parseInt(btnEle.id.split("-")[1]);
                });
            });
        });
};

// const submitBtn = document.getElementById("submit-btn");
// submitBtn.addEventListener("click", () => {
//     const form = document.getElementById("form");
//     const formData = new FormData(form);

//     console.log(formData);
// });