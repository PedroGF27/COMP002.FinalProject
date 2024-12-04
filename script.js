const squares = document.querySelectorAll('.game-square'); /* Selects all elements with class 'game-square' */
const restart = document.getElementById('button-play-again'); /* Selects ID element 'button-play-again' and stores it */
const xVictory = document.getElementById('scoreboard-x'); /* Selects ID element 'scoreboard-x' and stores it */
const oVictory = document.getElementById('scoreboard-o'); /* Selects ID element 'scoreboard-o' and stores it */

 let board = Array(9).fill(null); // Creates array with 9 elements set to null
let currentPlayer = 'X'; // Sets 'currentPlayer' to "X"
let game = true; // To ensure current game is active