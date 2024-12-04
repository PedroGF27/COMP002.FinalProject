const squares = document.querySelectorAll('.game-square'); /* Selects all elements with class 'game-square' */
const restart = document.getElementById('button-play-again'); /* Selects ID element 'button-play-again' and stores it */
const xVictory = document.getElementById('scoreboard-x'); /* Selects ID element 'scoreboard-x' and stores it */
const oVictory = document.getElementById('scoreboard-o'); /* Selects ID element 'scoreboard-o' and stores it */

let board = Array(9).fill(null); // Creates array with 9 elements set to null
let currentPlayer = 'X'; // Sets 'currentPlayer' to "X"
let game = true; // To ensure current game is active

let xWinner = localStorage.getItem('xWinner') ? parseInt(localStorage.getItem('xWinner')) : 0; // Retrieves value of 'xWinner' from local storage. If value exists, converts to integer, if not then default to 0
let oWinner = localStorage.getItem('oWinner') ? parseInt(localStorage.getItem('oWinner')) : 0; // Retrieves value of 'oWinner' from local storage. If value exists, converts to integer, if not then default to 0
xVictory.textContent = xWinner; // Sets text content of 'xVictory' to value of 'xWinner'
oVictory.textContent = oWinner; // Sets text content of 'oVictory' to value of 'xWinner'