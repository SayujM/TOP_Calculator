console.log("Logging from my JS file for the project.");
// Defining the global variables 
let operatorValue = '';
let previousValue = '';
let currentValue = '';

document.addEventListener("DOMContentLoaded", function(){
    // Step-1: Fetching all components of html
    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let digits = document.querySelectorAll(".digits");
    let operators = document.querySelectorAll(".operator");

    let previousDisplay = document.querySelector(".previous");
    let currentDisplay = document.querySelector(".current");

    // Step-2: Receiving the input number by the user
    digits.forEach((digit) => digit.addEventListener("click", function(e){
        obtainDigit(e.target.textContent);
        currentDisplay.textContent = currentValue;

    }));
    
    // Step-3: Receiving the input operator by the user
    operators.forEach((operator) => operator.addEventListener("click", function(e){
        obtainOperator(e.target.textContent);
        previousDisplay.textContent = previousValue + " " + operatorValue;
        currentDisplay.textContent = currentValue;
    }));

    // Step-4: Clearing the display & values when user presses Clear
    clear.addEventListener("click", function(){
        currentValue = '';
        previousValue = '';
        operatorValue = '';
        currentDisplay.textContent = '';
        previousDisplay.textContent = '';
    });

    // Step-5: Create the logic for mathematical operations reqd. in the basic calculator.
    equal.addEventListener("click", function(){
        calculate();
        if (previousValue !== ''){
            previousDisplay.textContent = '';
            currentDisplay.textContent = previousValue;
        }
        
    });

    // Step-6: Incorporating decimal values
    decimal.addEventListener("click", function(){
        addDecimal();
    });
})

function obtainDigit(digit){
    if (currentValue.length <= 5){
        currentValue += digit;
    }
};

function obtainOperator(operator){
    operatorValue = operator;
    previousValue = currentValue;
    currentValue = '';
};

function calculate(){
    if (previousValue !== '' && currentValue !== ''){
        previousValue = Number(previousValue);
        currentValue = Number(currentValue);
        // Now use the operator to complete the calculation
        if (operatorValue === '+'){
            previousValue += currentValue;
        } else if (operatorValue === '-'){
            previousValue -= currentValue;
        }else if (operatorValue === 'x'){
            previousValue *= currentValue;
        }else if (operatorValue === '/'){
            previousValue /= currentValue;
        }
        previousValue = roundNumber(previousValue);
        previousValue = previousValue.toString();
        currentValue = previousValue;
    }
};

// To limit the numbers being displayed after a given operation
function roundNumber(num){
    return Math.round(num * 100000) / 100000;
};


function addDecimal(){
    // Function called when "." is clicked & should work only once
    // Therefore, when called for the first time the currentValue will not contain "."
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
};
