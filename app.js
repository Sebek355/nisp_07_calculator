const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

let currentValue = "0";
let previousValue = null;
let operator = null;
let resetDisplay = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ",") {
            inputNumber(value);
        } else if (value === "+") {
            chooseOperator(value);
        } else if (value === "=") {
            calculate();
        } else if (value === "C") {
            clearAll();
        }

        updateDisplay();
    });
});

function inputNumber(num) {
    if (resetDisplay) {
        currentValue = "0";
        resetDisplay = false;
    }

    if (num === "," && currentValue.includes(",")) return;

    if (currentValue === "0" && num !== ",") {
        currentValue = num;
    } else {
        currentValue += num;
    }
}

function chooseOperator(op) {
    previousValue = parseFloat(currentValue.replace(",", "."));
    operator = op;
    resetDisplay = true;
}

function calculate() {
    if (previousValue === null || operator === null) return;

    const current = parseFloat(currentValue.replace(",", "."));
    let result = 0;

    switch (operator) {
        case "+":
            result = previousValue + current;
            break;
        case "−":
            result = previousValue - current;
            break;
    }

    currentValue = result.toString().replace(".", ",");
    operator = null;
    previousValue = null;
}

function clearAll() {
    currentValue = "0";
    previousValue = null;
    operator = null;
}

function updateDisplay() {
    display.textContent = currentValue;
}