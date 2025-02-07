let number;
let numberInMemory; 
let operator;

let display = document.querySelector(".display");
display.textContent = "";

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let clearButton = document.querySelector(".C");

function add(a, b) {
    a = new Number(a);
    b = new Number(b);
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR";
    }
    else {
        return a / b;
    }
}

function operate(first_num, second_num, operator) {
    if (operator == "/" && second_num == 0) {
        return "ERROR";
    }
    let result = 0;
    switch (operator) {
        case "+":
            result = add(first_num, second_num);
            if (!isInt(result)) {
                result = round(result, 3);
            }
            return result
            break;
        case "-":
            result = subtract(first_num, second_num);
            if (!isInt(result)) {
                result = round(result, 3);
            }
            return result
            break;
        case "*":
            result = multiply(first_num, second_num);
            if (!isInt(result)) {
                result = round(result, 3);
            }
            return result
            break;
        case "/":
            result = divide(first_num, second_num);
            if (!isInt(result)) {
                result = round(result, 3);
            }
            return result
            break;
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
  }

function isInt(n) {
    return n % 1 === 0;
 }
 
  
function getNumber(event) {
    let value = new Number(event.target.textContent);
    if (number == undefined) {
        number = value;
    }
    else if (number.toString().length <= 12){
        number = new Number(number.toString() + value.toString());
    }
    displayNumber(number);
}

function getOperator(event) {
    let value = event.target.textContent;
    
    //case for user pressing on = after inputting 2 numbers and an operator
    if (value == "=" && number != undefined && numberInMemory != undefined && operator != undefined) {
        numberInMemory = operate(numberInMemory, number, operator);
        if (numberInMemory == "ERROR") {
            display.textContent = "cant do that";
            numberInMemory = undefined;
            number = undefined;
            operator = undefined;
            return;
        }
        number = undefined;
        operator = undefined;
        displayNumber(numberInMemory);
    }

    //case for user pressing on an operator after inputting the first number
    else if (numberInMemory == undefined && number != undefined && value != "=") {
        operator = value;
        numberInMemory = number;
        number = undefined;
    }

    //case for user pressing on an operator after inputting 2 numbers and an operator (calculates the previous operation and uses it as the first number)
    else if (number != undefined && numberInMemory != undefined && operator != undefined && value != "=") {
        numberInMemory = operate(numberInMemory, number, operator);
        if (numberInMemory == "ERROR") {
            display.textContent = "cant do that";
            numberInMemory = undefined;
            number = undefined;
            operator = undefined;
            return;
        }
        operator = value;
        number = undefined;
        displayNumber(numberInMemory);
    }

    //case for user pressing on an operator after using the = button
    else if (numberInMemory != undefined && number == undefined && value != "=") {
        operator = value;
    }
    
    //case for user inputting new number after getting a result (fresh start lol)
    else if (numberInMemory != undefined && number != undefined && operator == undefined && value != "=") {
        numberInMemory = number;
        number = undefined;
        operator = value;
        displayNumber(numberInMemory);    
    }

}

function clearDisplay() {
    number = undefined;
    operator = undefined;
    numberInMemory = undefined;
    display.textContent = "";

}

function displayNumber(numberToDisplay) {
    if (numberToDisplay > 999999999999 || numberToDisplay.toString().length >= 12) {
        let scientificNotation = (new Number(numberToDisplay)).toExponential(6);
        display.textContent = scientificNotation;
        return;
    }
    display.textContent = numberToDisplay.toString();
}

function addDecimal(){
    if (number != undefined && !(number.toString().includes("."))) {
        number = number.toString() + ".";
        displayNumber(number);
    }
}

function deleteNumber() {
    if (number != undefined) {
        number = number.toString().substring(0, number.toString().length - 1);
        if (number == "-" || number == "") {
            number = "0";
        }
        displayNumber(number);
    }
}

function makeNegative() {
    if (number != undefined) {
        number = number * -1;
        displayNumber(number);
    }
}

numbers = document.querySelectorAll(".number");
numbers.forEach((element) => {
    element.addEventListener("click", getNumber);
});

operators = document.querySelectorAll(".operator");
operators.forEach((element) => {
    element.addEventListener("click", getOperator);
})

clearButton.addEventListener("click", clearDisplay);

//keyboard support
document.addEventListener('keypress', function(event) {
    console.log(event.key);
    if (event.key in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]) {
        obj = {
            target: {
                textContent: event.key,
            }
        }
        getNumber(obj);
    }
    else if (event.key === "/" || event.key === "*" || event.key === "+" || event.key === "-" || event.key === "=") {
        obj = {
            target: {
                textContent: event.key,
            }
        }
        getOperator(obj);
    }
    else if (event.key == "c" || event.key == "C") {
        clearDisplay();
    }
    else if (event.key == "Enter") {
        obj = {
            target: {
                textContent: "=", 
            }
        }
        getOperator(obj);
    }
    else if (event.key == ".") {
        addDecimal();
    }
});

decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", addDecimal);

backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click", deleteNumber);

negativeButton = document.querySelector(".negative");
negativeButton.addEventListener("click", makeNegative);