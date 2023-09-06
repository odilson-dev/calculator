let firstNumber;
let secondNumber;
let operators = document.querySelectorAll(".operator");
let isOperatorClickedAgain = 0;
let resultSaved;
let isDecimal = false;

let equal = document.querySelector("#equal");
let percent = document.querySelector("#percent");

let operatorValue = "";

let isOperatorClicked = false;

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


function add(numberA, numberB){
    return round(numberA + numberB, 2);
}

function substract(numberA, numberB){
    return round(numberA - numberB, 2);
}

function multiply(numberA, numberB){
    return round(numberA * numberB, 2);
}

function divide(numberA, numberB){
    if (numberB == 0){
        return "Lmaoo!";
    }
    return round(numberA / numberB, 2);
}

let display1 = document.querySelector("#display-1");
let display2 = document.querySelector("#display-2");

let clearButton = document.querySelector("#clear");

let buttons = document.querySelectorAll('.toDisplay');

let displayValue = "";
let firstNumberStr = "";
let secondNumberStr = "";

buttons.forEach(item => {
    item.addEventListener("click", () => {
        if(item.textContent === "." && isDecimal === false){
        displayValue += "."
        isDecimal = true;

        } else if(item.textContent === "." && isDecimal === true){
        displayValue += "";
        } else{
        displayValue += item.textContent;
        }
        
        populateDisplay(displayValue);
        if (!isOperatorClicked){
            firstNumberStr += item.textContent;
            firstNumber = parseFloat(firstNumberStr)
        } else {
            secondNumberStr += item.textContent;
            secondNumber = parseFloat(secondNumberStr);
            resultSaved = operate();
            // display1.firstChild.textContent = resultSaved;
        }
    })
});


function populateDisplay(value){
    display2.textContent = value;  
}

function operate(){
    let result = 0;
    switch (operatorValue){
        case "/":
            result = divide(firstNumber, secondNumber);
            break;
        case "x":
            result = multiply(firstNumber, secondNumber);
            break;
        case "-":
            result = substract(firstNumber, secondNumber);
            break;
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        case "":
            result = firstNumber;
    }
    return result;
}


operators.forEach(operator => {
    operator.addEventListener("click", () => {
        isOperatorClicked = true;
        isDecimal = false;
        operatorValue = operator.textContent;
        isOperatorClickedAgain += 1;
        displayValue += ` ${operatorValue} `;
        populateDisplay(displayValue);
        if (isOperatorClickedAgain >= 2){
            firstNumber = resultSaved;
            secondNumberStr = "";
        }
    })
});

percent.addEventListener("click",() => {
    (!isOperatorClicked) ? firstNumber *= 0.01 : secondNumber *= 0.01;
});


equal.addEventListener("click", () => {
    display1.textContent = operate();

});

clearButton.addEventListener("click", () => {
    display1.innerHTML= "";
    display2.innerHTML= "";
    isOperatorClicked = false;
    isDecimal = false;
    displayValue = "";
    firstNumberStr = "";
    secondNumberStr = "";
    operatorValue = "";
    firstNumber = null;
    secondNumber = null;
    isOperatorClickedAgain = 0;
})