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

console.log(operate(15, 5, "+"));
console.log(operate(15, 5, "-"));
console.log(operate(15, 5, "*"));
console.log(operate(15, 5, "/"));