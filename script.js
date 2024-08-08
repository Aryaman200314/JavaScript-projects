let random_number = parseInt(Math.random()*100+1);
const submit_btn = document.querySelector('#subt');
const user_input = document.querySelector('#guessField')

const guess_slots = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let number_guesses = 1
let playGame = true

if(playGame){
    submit_btn.addEventListener('click', function(e){
        e.preventDefault();
        console.log(random_number)
        const gussed_value = parseInt(user_input.value);
        console.log(gussed_value);
        validateGuess(gussed_value);
    })
}
function validateGuess(guessed_value) {
    // this method is used to check that the user is giving right value or nor
    // is he is giving an int value not an charater or the int is greater than 1
    if(isNaN(guessed_value)){
        alert('Please enter an valid number!')
    }
    else if(guessed_value<1){
        alert('Please enter an number greater that 1!')
    }
    else if(guessed_value>100){
        alert('Please enter an number less than 100!')
    }
    else{
        prevGuess.push(guessed_value)
        if(number_guesses>10){
            displayGuess(guessed_value);
            displayMessage(`Game over Random number war ${random_number}`)
            endGame();
        }
        else{
            displayGuess(guessed_value);
            checkGuess(guessed_value);
        }
    }
}

function checkGuess(guess_number){
    //this will check the user value is either equal to the random value if equal pass the 
    //value to display message and display the mess accordigly  
    if(guess_number === random_number){
        displayMessage(`YOu guessed it right!`)
        endGame()
    }
    else if(guess_number > random_number){
        displayMessage(`NUmber is high`);
    }
    else if(guess_number< random_number){
        displayMessage(`Number is low`);
    }
}

function displayGuess(guess){
    // clean the vlaues update the arrays and also the remain array will be updated by this method
    // this will display the number that the user have laready guessed
    // this niche wala line of code is to remove the written value after value is submitted 
    user_input.value = ''
    guess_slots.innerHTML = guess_slots.innerHTML + `${guess}, `;
    number_guesses++;
    remaining.innerHTML = `${11 - number_guesses}`
}

function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function newGame(){
    // this will start an game 
    const newGameButton = document.querySelector('.newGame');
    newGameButton.addEventListener('click', (e) => {
        random_number = parseInt(Math.random()*100+1);
        prevGuess = [];
        number_guesses = 1;
        guess_slots.innerHTML = '';
        remaining.innerHTML = `${11 - number_guesses}`;
        user_input.removeAttribute('disabled')
        startOver.removeChild(p);
        playGame = true;

    })
}

function endGame(){
    user_input.value = '';
    user_input.setAttribute('disabled', '');
    p.classList.add('button')
    p.innerHTML = `<button id="newGame">Start new game</button>`
    startOver.appendChild(p);
    playGame = false;
    newGame()
}