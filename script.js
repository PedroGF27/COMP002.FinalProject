const squares = document.querySelectorAll('.game-square'); /* Selects all elements with class 'game-square' */
const restart = document.getElementById('button-play-again'); /* Selects ID element 'button-play-again' and stores it */
const xVictory = document.getElementById('scoreboard-x'); /* Selects ID element 'scoreboard-x' and stores it */
const oVictory = document.getElementById('scoreboard-o'); /* Selects ID element 'scoreboard-o' and stores it */
const turnTracker = document.getElementById('turn'); // Selects ID element 'turn' and stores it

let board = Array(9).fill(null); // Creates array with 9 elements set to null
let currentPlayer = 'X'; // Sets 'currentPlayer' to "X"
let game = true; // To ensure current game is active

let xWinner = localStorage.getItem('xWinner') ? parseInt(localStorage.getItem('xWinner')) : 0; // Retrieves value of 'xWinner' from local storage. If value exists, converts to integer, if not then default to 0
let oWinner = localStorage.getItem('oWinner') ? parseInt(localStorage.getItem('oWinner')) : 0; // Retrieves value of 'oWinner' from local storage. If value exists, converts to integer, if not then default to 0
xVictory.textContent = xWinner; // Sets text content of 'xVictory' to value of 'xWinner'
oVictory.textContent = oWinner; // Sets text content of 'oVictory' to value of 'xWinner'
turnTracker.textContent = currentPlayer; // updates text inside 'turnTracker'

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
    const index = event.target.getAttribute('id').split('-')[1]; // extracts the number of the clicked square from its ID
    if (!game || board[index]) { // Checks if 'game' is false and to check if a square is occupied
        return; // prevent action on a square if it is occupied
    } 
    
    board[index] = currentPlayer; // updates the clicked square
    event.target.textContent = currentPlayer; // display either X or O depending which player clicked the square
    if (checkWinner()) { // checks if a player has won
        game = false; // if a winner is found then game will end
        turnTracker.textContent = `Player ${currentPlayer} wins!`; // used to display a congratulations to winner
        updateScores(currentPlayer); // update score and save them to local storage
    } else if (board.every(square => square)) { // checks if all squared are filled
        game = false; // if no winner is found and the board is full, game will end
        turnTracker.textContent = "Tie"; // display message indicating tie
    } else { // if no winner or tie then it switches turns
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // toggles current player between X and O
        turnTracker.textContent = currentPlayer; // Updates 'turnTracker' to display current player's symbol
    } 
} 

function checkWinner() { // checks if a player has won
    return winCombinations.some(combination => { // if there is a winning combination, it stops and returns true
        return combination.every(index => { // checks if all positions are occupied and in a winning combination
            return board[index] === currentPlayer; // if any winning combination is occupied by a player, it returns true
        });
    }); 
} 

function updateScores(winner) { 
    if (winner === 'X') { // checks if X is victor
        xWinner++; // X score goes up by 1
        localStorage.setItem('xWinner', xWinner); //  saves into local storage 
        xVictory.textContent = xWinner; // updates the score
    } else if (winner === 'O') { // checks if O is victor
        oWinner++; // O score goes up by 1
        localStorage.setItem('oWinner', oWinner); // stores into local storage
        oVictory.textContent = oWinner;// update player O score
    } 
} 

function resetGame() { 
    board.fill(null); // resets the board
    squares.forEach(square => square.textContent = ''); // clears the squares
    game = true; // makes the game active again
    currentPlayer = 'X'; // sets the current player to X
    turnTracker.textContent = currentPlayer; // displays current player
} 

squares.forEach(square => { // iterates each square and allows them to be clicked again
    square.addEventListener('click', handleSquareClick); // when a square is clicked, the function 'handleSquareClick' is called. this helps reset the board and player
}); 

restart.addEventListener('click', resetGame); // when the "Play Again!" button is clicked, it will create a new round