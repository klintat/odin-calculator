const keyboardNumbers = document.querySelectorAll(".btn-number");
const keyboardOperators = document.querySelectorAll(".btn-operator");
const currentValue = document.querySelector(".current-value");
const previousValue = document.querySelector(".previous-value");
const btnEqual = document.querySelector(".btn-equal");
const btnClear = document.querySelector(".btn-clear");
const btnErase = document.querySelector(".btn-erase");
const btnDot = document.querySelector(".btn-dot")

let numberOne;
let numberTwo;
let operatorValue;
let isResult = false;

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}
  
function multiply(a, b) {
    return a * b
}
  
function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
      case '+': return add(a, b)
      case '-': return substract(a, b)
      case '*': return multiply(a, b)
      case '/':
        if (b === 0) return null
        else return divide(a, b)
      default: return null
    }
}

keyboardNumbers.forEach(button => {
    button.addEventListener("click", function(e){
        if(isResult) {
            currentValue.textContent = "";
            isResult = false;
        }
        currentValue.textContent += e.target.textContent;
    });
})

btnDot.addEventListener("click", function(e) {
    if(currentValue.textContent.length > 0 && currentValue.textContent.indexOf(".") === -1) {
        currentValue.textContent += e.target.textContent;
    }
})

keyboardOperators.forEach(button => {
    button.addEventListener("click", function(e){
        if(currentValue.textContent.length > 0) {
            if(operatorValue) {
                numberOne = operate(operatorValue, numberOne, currentValue.textContent)
            } else {
                numberOne = currentValue.textContent;
            }
            operatorValue = e.target.textContent;
            currentValue.textContent = "";
            previousValue.textContent = numberOne + operatorValue;
        }
    })
})

btnEqual.addEventListener("click", function(){
    if(operatorValue && currentValue.textContent.length > 0) {
        numberTwo = currentValue.textContent;
        currentValue.textContent = operate(operatorValue, numberOne, numberTwo);
        isResult = true;
        clear();
    }
})

btnClear.addEventListener("click", function(){
    currentValue.textContent = "";
    clear();
})

function clear() {
    previousValue.textContent = "";
    operatorValue = undefined;
    numberOne = undefined;
    numberTwo = undefined;
}

btnErase.addEventListener("click", function() {
    if(isResult) {
        currentValue.textContent = "";
        isResult = false;
    } else {
        currentValue.textContent = currentValue.textContent.slice(0,-1);
    }
})