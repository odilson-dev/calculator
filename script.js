let firstNumber;
let operator;
let secondNumber;

function add(numberA, numberB){
    return numberA + numberB;
}

function substract(numberA, numberB){
    return numberA - numberB;
}

function multiply(numberA, numberB){
    return numberA * numberB;
}

function divide(numberA, numberB){
    return numberA / numberB
}

function operate(operator, firstNumber, secondNumber){
    add(firstNumber, secondNumber);
}
let display2 = document.querySelector("#display-2");

let buttons = document.querySelectorAll('.toDisplay');

let displayValue = "";

function populateDisplay(){
    buttons.forEach(item => {
        item.addEventListener("click", () => {
            displayValue += item.textContent;
            display2.firstChild.textContent = displayValue;
        })
    });
    
}
populateDisplay();
