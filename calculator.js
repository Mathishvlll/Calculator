let runningTotal = 0;
let buffer = '0';
let previousOperator;
const screen = document.querySelector('.screen')

function init () {
  document
     .querySelector('.calc-buttons')
     .addEventListener('click', function(e) {
       buttonClick(e.target.innerText);
     })
}

init();

function buttonClick(value) {
  if(isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleNumber(value) {
  if(buffer === '0') {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handleSymbol(value) {
  switch(value) {
    case 'C':
      runningTotal = 0;
      buffer = '0';
      break;
    case '=':
      if(previousOperator === null) {
        return;
      } 
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
      case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  if(buffer === '0') {
    return;
  }
 
  const intBuffer = parseInt(buffer);
  if(runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = value;
  buffer = '0';
}

function flushOperation(intBuffer) {
  if(previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}