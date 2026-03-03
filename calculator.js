document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.getElementById('clear');
    const backspaceButton = document.getElementById('backspace');
    const decimalButton = document.getElementById('decimal');
    const equalsButton = document.getElementById('equals');

    // Calculator state
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetInput = false;

    // Update display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Append number
    function appendNumber(number) {
        if (currentInput === '0' || resetInput) {
            currentInput = number;
            resetInput = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    // Append decimal
    function appendDecimal() {
        if (resetInput) {
            currentInput = '0.';
            resetInput = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    // Choose operation
    function chooseOperation(op) {
        if (operation !== null) calculate();
        previousInput = currentInput;
        operation = op;
        resetInput = true;
    }

    // Calculate
    function calculate() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        
        currentInput = computation.toString();
        operation = null;
        resetInput = true;
        updateDisplay();
    }

    // Clear display
    function clearDisplay() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    // Backspace
    function backspace() {
        if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    // Event listeners for number buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
        });
    });

    // Event listeners for operator buttons
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.textContent);
        });
    });

    // Event listeners for other buttons
    decimalButton.addEventListener('click', appendDecimal);
    equalsButton.addEventListener('click', calculate);
    clearButton.addEventListener('click', clearDisplay);
    backspaceButton.addEventListener('click', backspace);

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        if (event.key >= '0' && event.key <= '9') {
            appendNumber(event.key);
        } else if (event.key === '.') {
            appendDecimal();
        } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
            chooseOperation(event.key === '*' ? '×' : event.key === '/' ? '÷' : event.key);
        } else if (event.key === 'Enter' || event.key === '=') {
            calculate();
        } else if (event.key === 'Escape') {
            clearDisplay();
        } else if (event.key === 'Backspace') {
            backspace();
        }
    });
});