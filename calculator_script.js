document.addEventListener('DOMContentLoaded', function () {
    const screen = document.getElementById('calculator-screen');
    let currentInput = '';
    let operator = null;
    let firstOperand = null;

    // Function to clear the calculator screen and reset variables
    function clearScreen() {
        screen.textContent = '0';
        currentInput = '';
        operator = null;
        firstOperand = null;
    }

    // Function to perform the calculation based on the operator and operands
    function calculate() {
        const secondOperand = parseFloat(currentInput);
        let result;

        // Check if both operands are valid numbers
        if (isNaN(firstOperand) || isNaN(secondOperand)) {
            alert('Please enter valid numbers!');
            return;
        }

        // Perform the operation based on the selected operator
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                result = 'Error';
                break;
        }

        // Display the result on the calculator screen
        screen.textContent = result;
        currentInput = ''; // Reset the current input
        firstOperand = result; // Allow chaining operations
        operator = null; // Reset operator
    }

    // Add event listeners to all calculator buttons
    document.querySelectorAll('.calc-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                clearScreen(); // Clear the screen when 'C' button is pressed
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    operator = value; // Store the operator
                    firstOperand = parseFloat(currentInput); // Store the first operand
                    currentInput = ''; // Clear input for the next operand
                }
            } else if (value === '=') {
                if (operator && currentInput) {
                    calculate(); // Perform the calculation when '=' is pressed
                }
            } else {
                currentInput += value; // Concatenate clicked number
                screen.textContent = currentInput; // Update screen with the new number
            }
        });
    });

    clearScreen(); // Initialize by clearing the screen on load
});
