let number;
let numberInMemory; 
let operator;

let display = document.querySelector(".display");
display.textContent = "";

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let clearButton = document.querySelector(".C");

function add(a, b) {
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
    switch (operator) {
        case "+":
            return add(first_num, second_num);
            break;
        case "-":
            return subtract(first_num, second_num);
            break;
        case "*":
            return multiply(first_num, second_num);
            break;
        case "/":
            return divide(first_num, second_num);
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
    else {
        number = new Number(number.toString() + value.toString());
    }
    displayNumber(number);
}

function getOperator(event) {
    let value = event.target.textContent;
    
    //case for user pressing on = after inputting 2 numbers and an operator
    if (value == "=" && number != undefined && numberInMemory != undefined && operator != undefined) {
        numberInMemory = operate(numberInMemory, number, operator);
        number = undefined;
        operator = undefined;
        displayNumber(numberInMemory);
        console.log(numberInMemory, number, operator);
    }

    //case for user pressing on an operator after inputting the first number
    else if (numberInMemory == undefined && number != undefined) {
        operator = value;
        numberInMemory = number;
        number = undefined;
    }

    //case for user pressing on an operator after inputting 2 numbers and an operator (calculates the previous operation and uses it as the first number)
    else if (number != undefined && numberInMemory != undefined && operator != undefined) {
        numberInMemory = operate(numberInMemory, number, operator);
        operator = value;
        number = undefined;
        displayNumber(numberInMemory);
    }

    //case for user pressing on an operator after using the = button
    else if (numberInMemory != undefined && number == undefined) {
        operator = value;
    }
    
    //case for user inputting new number after getting a result (fresh start lol)
    else if (numberInMemory != undefined && number != undefined && operator == undefined) {
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
    if (isInt(numberToDisplay) == false) {
        numberToDisplay = round(numberToDisplay, 2);
    }
    display.textContent = numberToDisplay.toString();
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