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

const winCombinations = [ // winning combinations
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // top left to bottom right
    [2, 4, 6]  // top right to bottom left
];

function handleSquareClick(event) {
    const index = event.target.getAttribute('data-index');

    if (!game || board [index]) {
        return;
    }
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer

    if (checkWinner()) { 
        game = false;
        message.textContent = `Player ${currentPlayer} wins!`;
        updateScores(currentPlayer);
    } else if (board.every(square => square)) {
        game = false;
        message.textContent = 'Tie';    
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function updateScores(winner) {
    if(winner === 'X') {
        xWinner++;
        localStorage.setItem('xWinner', xWinner);
        xVictory.textContent = xWinner;
    }  else if (winner === 'O') {
        oWinner++;
        localStorage.setItem('oWinner', oWinner);
        oVictory.textContent = oWinner;
    }
}

function resetGame() {
    board.fill(null);
    squares.forEach(square => square.textContent = '');
    game = true;
    currentPlayer = 'X';
    message.textContent = '';
}