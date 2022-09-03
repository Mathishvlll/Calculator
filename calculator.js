const screen = document.querySelector('.screen')
const buttons = document.querySelectorAll('.calc-button')

let runningTotal = 0;
let buffer = '';
let previousOperator;

// Listen buttons
buttons.forEach(button => button.addEventListener('click', (e) => {
    buttonClick(e.target.textContent)
}))

// Display buttons
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    screen.textContent = buffer
}

// Handle numbers
function handleNumber(value) {
  if (buffer === '0') {
    buffer = value;
  } else {
    buffer += value;
  }
}

// Handle symbols
function handleSymbol(value) {
    switch(value) {
        case 'C':
            runningTotal = 0;
            buffer = '0';
            break;
        case'=':
            if (previousOperator === null) {
                return;
            }
            operation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        operation(intBuffer);
    }

    previousOperator = value;
    buffer = '0';
}

function operation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

