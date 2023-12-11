function add() {
    if (arguments.length < 2) {
        return 1;
    }

    let sum = 0;

    for (let num of arguments) {
        sum += num;
    }

    return sum;
}

function subtract() {
    if (arguments.length < 2) {
        return 1;
    }

    let difference = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        difference -= arguments[i];
    }

    return difference;
}

function multiply() {
    if (arguments.length < 2) {
        return 1;
    }

    let product = 1;

    for (let num of arguments) {
        product *= num;
    }

    return product;
}

function divide() {
    if (arguments.length < 2) {
        return 1;
    }

    let quotient = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        quotient /= arguments[i];
    }

    return quotient;
}

function operate(firstNum, operator, secondNum) {
    let answer = 0;
    switch (operator) {
        case `+`:
            answer = add(firstNum, secondNum);
            break;
        case `-`:
            answer = subtract(firstNum, secondNum);
            break; 
        case `*`:
            answer = multiply(firstNum, secondNum);
            break;
        case `/`:
            answer = divide(firstNum, secondNum);
            break;
        default:
            break;
    }

    return answer;
}

//changes display to reflect one specific button click
function display(button) {
    let currentText = document.querySelector(`.display`).textContent;

    let buttonText = button.textContent;
    
    let newText = currentText + buttonText;

    document.querySelector(`.display`).textContent = newText;
}

//changes display when any button is clicked
function changeDisplay() {
    let buttons = document.querySelectorAll(`.pad`);
    buttons.forEach((button) => {
        button.addEventListener(`click`, () => {
            display(button);
        });
    });
}

let firstNum = 10;
let secondNum = 2;
let operator = `/`;

console.log(operate(firstNum, operator, secondNum));
changeDisplay();