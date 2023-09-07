let firstNumber = 0;
let secondNumber = 0;
let operators = document.querySelectorAll(".operator");
let isOperatorClickedAgain = 0;
let resultSaved;
let isDecimal = false;
let equal = document.querySelector("#equal");
let percent = document.querySelector("#percent");
let negativeButton = document.querySelector("#negative");
let mode = document.querySelector("#mode");
let container = document.querySelector(".container");
let display1 = document.querySelector("#display-1");
let display2 = document.querySelector("#display-2");
let clearButton = document.querySelector("#clear");
let buttons = document.querySelectorAll('.toDisplay');
let displayValue = "";
let firstNumberStr = "";
let secondNumberStr = "";
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


negativeButton.addEventListener("click", () => {
    if(!isOperatorClicked){
        firstNumber *= -1;
        displayValue = firstNumber
        populateDisplay(displayValue);
    } else{
        secondNumber *= -1
        displayValue = secondNumber
    }
    
})

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
});


mode.addEventListener("click", () => {
    display1.style.transitionDuration = "500ms";
    console.log(typeof(mode.children[0].classList));
    
    
    console.log(mode.children[0].classList);
    if(container.classList.contains("white")){
        container.classList.remove("white")
        display1.style.color = "white";
        mode.children[0].classList = [];
        mode.children[0].classList.add("fa-regular", "fa-sun");
        
    } else{
        container.classList.add('white')
        display1.style.color = "#262D37";
        mode.children[0].classList = [];
        mode.children[0].classList.add("fas", "fa-moon");
    }
    
})