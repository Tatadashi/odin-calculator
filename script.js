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
            if (secondNum == 0) {
                answer = `Cannot Divide by 0`;
            } else {
                answer = divide(firstNum, secondNum);
            }
            break;
        default:
            break;
    }

    return answer;
}

//changes display to add new text
function addToDisplay(text) {
    let currentText = document.querySelector(`.display`).textContent;
    let newText;

    //clear if display text is a string
    if (currentText == `EMPTY` || currentText == `Cannot Divide by 0`) {
        document.querySelector(`.display`).textContent = ``;
        newText = text;
    } else {
        newText = currentText + text;
    }

    document.querySelector(`.display`).textContent = newText;
}

//clears and resets global var/bool
function resetCalculator() {
    document.querySelector(`.display`).textContent = `EMPTY`;

    firstNum = ``;
    operator = `N/A`;
    secondNum = ``;
    previousAnswer = '';
    isFirstNum = true;
    hasOperator = false;
    isOperable = false;
}

//change (if applicable) posiive number to negative or the inverse of that. changes the current number
function invertNumber() {

    //isOperable being true means currently changing second number
    if (isOperable) {
        displayText = document.querySelector(`.display`).textContent;
        
        document.querySelector(`.display`).textContent = displayText.slice(0, displayText.length - secondNum.length);

        //convert to string to use .length property
        secondNum = String(secondNum * -1);
        document.querySelector(`.display`).textContent += secondNum;
    } else if (firstNum != `` && !hasOperator) {
        displayText = document.querySelector(`.display`).textContent;
        
        //convert to string to use .length property
        firstNum = String(firstNum * -1);
        document.querySelector(`.display`).textContent = ``;
        document.querySelector(`.display`).textContent += firstNum;
    }
}

function backspace() {
    if (document.querySelector(`.display`).textContent != `EMPTY`) {
        displayText = document.querySelector(`.display`).textContent;

        document.querySelector(`.display`).textContent = displayText.slice(0, displayText.length - 1);

        if (isOperable) {
            secondNum = secondNum.slice(0, secondNum.length - 1);
    
            if (secondNum == ``) {
                isOperable = false;
            }
        } else if (hasOperator) {
            operator = `N/A`;
            hasOperator = false;
            isFirstNum = true;
        } else {
            firstNum = firstNum.slice(0, firstNum.length - 1);

            if (firstNum == ``) {
                document.querySelector(`.display`).textContent = `EMPTY`;
            }
        }
    }
}

//checks which type of button is clicked
function checkButton(button) {
    let displayText = ``;
    if (button.textContent == `=`) {
        if (isOperable) {
            let answer = operate(Number(firstNum), operator, Number(secondNum));
            resetCalculator();

            if (answer == `Infinity`) {
                answer = `Number too Big`;
            } else if (answer != `Cannot Divide by 0`) {
                answer = Math.round(answer * Math.pow(10, 5)) / Math.pow(10, 5);
                firstNum = String(answer);
                previousAnswer = answer;

                if (answer > 10e+9) {
                    answer = answer.toExponential(5);
                }
            } 

            document.querySelector(`.display`).textContent = answer;
        }
    } else if (button.classList.contains(`operator`)) {
        if (!hasOperator && firstNum != ``) {
            operator = button.textContent;
            isFirstNum = false;
            hasOperator = true;

            displayText = operator;
            addToDisplay(displayText);
        }
    } else if (button.classList.contains(`clear`)) {
        resetCalculator();
    } else if (button.classList.contains(`invert`)) {
        invertNumber();
    } else if (button.classList.contains(`decimal`)) {
        if (isFirstNum && firstNum != `` && !firstNum.includes(`.`)) {
            firstNum += button.textContent;
            displayText = button.textContent;
            addToDisplay(displayText);
        } else if (secondNum != `` && !secondNum.includes(`.`)) {
            secondNum += button.textContent;
            displayText = button.textContent;
            addToDisplay(displayText);
        }
    } else if (button.classList.contains(`reuse`)) {
        if (previousAnswer != ``) {
            //if RR it just adds them as a whole string, ex. previousAnswer = 23, RR = 2323, RRRR = 23232323
            if (isFirstNum) {
                firstNum += previousAnswer;
            } else {
                secondNum += previousAnswer;
                isOperable = true;
            }
    
            displayText = button.textContent;
            addToDisplay(displayText);
        }
    } else if (button.classList.contains(`back`)) {
        backspace();
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
let previousAnswer = '';
let isFirstNum = true;
let hasOperator = false;
let isOperable = false;

addButtonClickEvents();