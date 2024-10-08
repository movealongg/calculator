let input = document.querySelector('.input');
let output = document.querySelector('.output');

let settingsButton = document.querySelector('.settings-button');
let themes = document.querySelector('.themes');
let themeButtons = document.querySelectorAll('.theme-button');

let history = document.querySelector('.history');
let historyButtons = document.querySelectorAll('.history-button');
let calculations = document.querySelector('.history-text');
let clear = document.querySelector('.clear');

let buttons = document.querySelectorAll('.buttons button');

let value = '';

let equationOperators = [ ' ÷ ', ' x ', ' + ', ' - ' ];

// Add click event to each button and do calculations
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonValue = e.target.value;
        console.log(buttonValue)

        if (buttonValue === 'C') {
            // If you hit the clear button, clear out both input and output
            value = '';
            input.innerText = '';
            output.innerText = '';
        } else if (buttonValue === 'Del') {
            if (value.length > 1) {
                // If you hit backspace and the input has at least one character, remove the last character
                value = value.slice(0, -1);
            } else {
                // otherwise just clear out the value / input
                value = '';
                output.innerText = '';
            }
            input.innerText = value;
        } else if (buttonValue === ' % ') {
            // If you hit percent, turn that value into the decimal version of the percentage
            value = value / 100;
            input.innerText = value;
        } else if (buttonValue === '.') {
            if (input.innerText.includes('=')) {
                value = '0.';
                output.innerText = '';
            } else {
                // Split the equation up by operator
                let allNumbers = value.split(/[\+\-\x\÷]/);

                // Find the last number in the equation 
                let lastNumber = allNumbers[allNumbers.length - 1];

                // If that number already has a decimal, don't allow it to add a second decimal 
                if (lastNumber.includes('.')) {
                    value += '';
                } else {
                    value += buttonValue;
                }
            }
            input.innerText = value;

            // If you hit equal once, do this
        } else if (buttonValue === '=' && value !== '' && equationOperators.some(char => input.innerText.includes(char)) && value[value.length -1] !== ' ' && !input.innerText.includes('=')) {
            evaluate();
        
            // If you hit equal more than once, just redo the last expression on the updated answer
        } else if (buttonValue === '=' && input.innerText.includes('=')) {
            // Get the current equation 
            let currentInput = input.innerText;

            // Get the index of the = 
            let equalSignIndex = input.innerText.indexOf('=');

            // Remove = and answer to just show the expression itself
            let lastEquation = currentInput.slice(0, equalSignIndex);

            // Get the index for each math operator in the expression
            let operatorIndexes = equationOperators.map((operator => lastEquation.lastIndexOf(operator)));

            // Find the highest index aka last index / operator
            let lastOperator = Math.max(...operatorIndexes);

            // Show just the last operator and the number after it
            let lastCalculation = lastEquation.slice(lastOperator);

            // Let the next input be the previous answer and the last calculation
            value = output.innerText + lastCalculation;
            input.innerText = value;
            
            evaluate();
        } else {
            // If the button is an operator
            if (buttonValue !== '=' && buttonValue !== 'Del' && buttonValue !== 'C') {
                let operators = [
                    '.', ' % ', ' ÷ ', ' x ', ' + ', ' - '
                ];
                // don't allow the use of two operators in a row
                if (operators.includes(buttonValue) && input.innerText.slice(-1) === buttonValue.replace(/\s/g, '')) {
                    value += '';

                // If an answer is showing and you type a new number, clear out old equation and start a new one
                } else if (output.innerText !== '' && !isNaN(buttonValue) && value[value.length -1] !== ' ' && input.innerText.includes('=')) {
                    output.innerText = '';
                    value = '';
                    value += buttonValue;
                } else {
                    value += buttonValue;
                }
                input.innerText = value;
            }
        }
    })
});

// Replace multiply and divide symbols before calculating
function formatValue(value) {
    return value.replaceAll('x', '*').replaceAll('÷', '/');
}

// Add click events to history buttons to open and close the modal
historyButtons.forEach((button) => {
    button.addEventListener('click', () => {
        history.classList.toggle('show-history');
    });
});

// Add click event to settings button to open theme dropdown
settingsButton.addEventListener('click', () => {
    themes.classList.toggle('show-dropdown');
    themes.classList.toggle('hide-dropdown');
});

// Add click event to theme options to change calculator theme
themeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let themeSelection = e.target.innerText;
        let root = document.querySelector(':root');

        if (themeSelection === 'Dark') {
            root.style.setProperty("--background-color", "#000000");
            root.style.setProperty("--display-text-color", "#ffffff");
            root.style.setProperty("--button-text-color", "#ffffff");
            root.style.setProperty("--number-bg-color", "#1C1C1C");
            root.style.setProperty("--top-row-bg-color", "#D4D4D2");
            root.style.setProperty("--gear-color", "#D4D4D2");
            root.style.setProperty("--operator-color", "#FF9500");
            themes.classList.toggle('show-dropdown');
            themes.classList.toggle('hide-dropdown');
        } else if (themeSelection === 'Light') {
            root.style.setProperty("--background-color", "#ffffff");
            root.style.setProperty("--display-text-color", "#000000");
            root.style.setProperty("--button-text-color", "#ffffff");
            root.style.setProperty("--number-bg-color", "#1C1C1C");
            root.style.setProperty("--top-row-bg-color", "#D4D4D2");
            root.style.setProperty("--gear-color", "#1C1C1C");
            root.style.setProperty("--operator-color", "#FF9500");
            themes.classList.toggle('show-dropdown');
            themes.classList.toggle('hide-dropdown');
        } else if (themeSelection === 'Neutral') {
            root.style.setProperty("--background-color", "#1d1d1d");
            root.style.setProperty("--display-text-color", "#ffffff");
            root.style.setProperty("--button-text-color", "#ffffff");
            root.style.setProperty("--number-bg-color", "#967860");
            root.style.setProperty("--top-row-bg-color", "#e8dac9");
            root.style.setProperty("--gear-color", "#D4D4D2");
            root.style.setProperty("--operator-color", "#9f9785");
            themes.classList.toggle('show-dropdown');
            themes.classList.toggle('hide-dropdown');
        } else {
            root.style.setProperty("--background-color", "#5b5a72");
            root.style.setProperty("--display-text-color", "#ffffff");
            root.style.setProperty("--button-text-color", "#ffffff");
            root.style.setProperty("--number-bg-color", "#9482a5");
            root.style.setProperty("--top-row-bg-color", "#cacee2");
            root.style.setProperty("--gear-color", "#D4D4D2");
            root.style.setProperty("--operator-color", "#b891b8");
            themes.classList.toggle('show-dropdown');
            themes.classList.toggle('hide-dropdown');
        }
    });
});



// Add click event to clear out history
clear.addEventListener('click', () => {
    calculations.innerHTML = '';
});

// Evaluate equation 
function evaluate() {
    // If you hit equal and the value isn't blank, includes at least one operator, and doesn't end with an operator, add the equation to the history
    let expression = input.innerText;

    // Evaluate your equation and show the input and output. Round decimals.
    let answer = Math.round(eval(formatValue(input.innerText)) * 1000) / 1000;
    output.innerText = answer;
    input.innerText += ` = ${answer}`;

    // If you do another equation after you've already hit equal, set the answer as the new input
    if (output.innerText !== '') {
        value = answer;  
    }

    // Add the full equation to the history
    calculations.innerHTML = `<div class="calculation"><p class="equation">${expression} = </p><p class="answer">${answer}</p></div>` + calculations.innerHTML;
}