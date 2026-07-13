const display = document.getElementById("result");
const buttons = document.querySelectorAll("button");

// Add value to display
function appendValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += value;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        let expression = display.value.replace(/%/g, "/100");

        display.value = eval(expression);

        if (display.value === "Infinity") {
            display.value = "Error";
        }

    } catch {
        display.value = "Error";
    }
}

// Button Click Events
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        switch (value) {

            case "AC":
                clearDisplay();
                break;

            case "⌫":
                deleteLast();
                break;

            case "=":
                calculate();
                break;

            default:
                appendValue(value);
        }

    });

});

// Keyboard Support
document.addEventListener("keydown", (e) => {

    const key = e.key;

    // Numbers
    if (!isNaN(key)) {
        appendValue(key);
        return;
    }

    // Operators
    if (["+", "-", "*", "/", ".", "%"].includes(key)) {
        appendValue(key);
        return;
    }

    // Enter
    if (key === "Enter") {
        e.preventDefault();
        calculate();
    }

    // Backspace
    if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    if (key === "Escape") {
        clearDisplay();
    }

});