let input = document.querySelector('.input');
let output = document.querySelector('.output');

let history = document.querySelector('.history');
let historyButtons = document.querySelectorAll('.history-button');
let calculations = document.querySelector('.history-text');
let clear = document.querySelector('.clear');

let buttons = document.querySelectorAll('.buttons button');

let value = '';

// Add click event to each button and do calculations
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let buttonValue = e.target.value;
        console.log(buttonValue)

        if (buttonValue === 'C') {
            value = '';
            input.innerText = '';
        } else if (buttonValue === 'Del') {
            if (value.length > 1) {
                value = value.slice(0, -1);
            } else {
                value = '';
            }
            input.innerText = value;
        }  else if (buttonValue === '=' && value !== '') {
            calculations.innerHTML += `<p class="equation">${input.innerText} = </p>`;
            let answer = eval(formatValue(input.innerText));
            input.innerText = answer;
            value = answer;
            calculations.innerHTML += `<p class="answer">${answer}</p>`;
        } else {
            if (buttonValue !== '=' && buttonValue !== 'Del' && buttonValue !== 'C') {
                value += buttonValue;
                input.innerText = value;
            }
        }
    })
});

// Replace multiply and divide symbols before calculating
function formatValue(value) {
    return value.replace('x', '*').replace('÷', '/');
}

// Add click events to history buttons to open and close the modal
historyButtons.forEach((button) => {
    button.addEventListener('click', () => {
        history.classList.toggle('show-history');
    });
})

// Add click event to clear out history
clear.addEventListener('click', () => {
    calculations.innerHTML = '';
});