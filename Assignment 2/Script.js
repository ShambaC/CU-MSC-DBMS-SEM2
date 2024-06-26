// Question 1
numArray = [1, 1, 1, 1, 2, 2, 2, 3, 4, 4, 5];

mode = (array) => {
    count = {};
    for (num of array) {
        count[num] = count[num] ? count[num] + 1 : 1;
    }

    maxVal = 0;
    maxValKey = 0;
    for ([key, value] of Object.entries(count)) {
        if (value > maxVal) {
            maxVal = value;
            maxValKey = key;
        }
    }

    return maxValKey;
}

console.log("Q1-mode");
console.log(mode(numArray));


// Question 2
dictConst = {"a": 1, "b": 2, "c": 3};

swapDict = (dict) => {
    swap = {};
    for ([key, value] of Object.entries(dict)) {
        swap[value] = key;
    }

    return swap;
}

console.log("Q2-dictionary swap");
console.log(swapDict(dictConst));


// Question 3
console.log("Q3-callback");
function multiply(callback, a, b) {
    c = a * b;
    callback(c);
}

function foo(x) {
    console.log("Callback foo: " + x);
}

multiply(foo, 2, 6);


// Question 4
console.log("Q4-map nad forEach");
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map((x) => {return x * 2});

doubledNumbers.forEach((ele, index) => {
    console.log(`The doubled value of number at index ${index} is ${ele}`);
});