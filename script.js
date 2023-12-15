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
        case `x`:
            answer = multiply(firstNum, secondNum);
            break;
        case `÷`:
            answer = divide(firstNum, secondNum);
            break;
        default:
            break;
    }

    return answer;
}

//changes display to add new text
function addToDisplay(text) {
    let currentText = document.querySelector(`.display`).textContent;
    let newText = currentText + text;

    document.querySelector(`.display`).textContent = newText;
}

//checks which type of button is clicked
function checkButton(button) {
    let displayText = ``;
    if (button.textContent == `=`) {
        if (isOperable) {
            let answer = operate(Number(firstNum), operator, Number(secondNum));
            document.querySelector(`.display`).textContent = answer;
            firstNum = answer;

            //reset to default values
            operator = `N/A`;
            secondNum = ``;
            isFirstNum = true;
            hasOperator = false;
            isOperable = false;
        }
    } else if (button.classList.contains(`operator`)) {
        if (!hasOperator) {
            operator = button.textContent;
            isFirstNum = false;
            hasOperator = true;

            displayText = operator;
            addToDisplay(displayText);
        }
    } else {
        if (isFirstNum) {
            firstNum += button.textContent;
        } else {
            secondNum += button.textContent;
            isOperable = true;
        }

        displayText = button.textContent;
        addToDisplay(displayText);
    }
}

//adds click event for every button
function addButtonClickEvents() {
    let buttons = document.querySelectorAll(`.pad`);
    buttons.forEach((button) => {
        button.addEventListener(`click`, () => {
            checkButton(button);
        });
    });
}

let firstNum = ``;
let operator = `N/A`;
let secondNum = ``;
let isFirstNum = true;
let hasOperator = false;
let isOperable = false;

addButtonClickEvents();