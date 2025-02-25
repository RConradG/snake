/*-------------- Constants -------------*/
const DEFAULT_BOARD_SIZE = 20 * 20;


/*---------- Variables (state) ---------*/
// Time/Timer
// Score
let food;
let snake;
let snakeLocation = [{ x: 10, y: 10 }];
let boardRows = 20;
let boardColumns = 20;
 
 /*----- Cached Element References  -----*/
 
// querySelect start game button
const gameBoard = document.querySelector(".game-board");

const cells = document.querySelectorAll(".cell");

/*-------------- Functions -------------*/
render();

function render() {
  createGameBoard();
  setFood();
  setSnake();
};

function createGameBoard () {
  for (let i = 0; i < boardRows * boardColumns; i++) {
    const boardCell = document.createElement("div");
    boardCell.setAttribute("class", "cell")
    boardCell.id = `cell-${i}`;
    console.log(boardCell);
    gameBoard.appendChild(boardCell);
  }
};

function setFood() {
  food = document.getElementById("cell-38");
  // food.setAttribute("class", "food");
  food.classList.add("food") // maybe use?
}

function setSnake() {
  snake = document.getElementById("cell-268");
  snake.setAttribute("class", "snake");
}
// growSnake:
// Grow snake once food is eaten
 
// gameOver:
// Freeze game board, show game over message
 
// showYouLose:
// Show the message "You Lost!"
 
// showYouWin:
// Show the meesage "You Win"
 
// showScore:
// Show the current score
 
// updateScore:
// When the snake "eats" update score
 
// moveFood:
// Move food to a random place on the grid

// render():
// Will start and restart game
 
/*----------- Event Listeners ----------*/
// will use the keyboard for snake control, might include option to use arrow keys
// Listen for certain keyboard keys to be entered
// I = up
// J = left
// K = right
// N = down
 
// Listen for start button to be pressed (possibly use a keyboard key?)
 
// Listen for pause button to be pressed (possible use keyboard key?)

// Listen for one keyboard key to start, pause, and restart game?

// • Create Grid
// • Create food
// • Create snake
// • Figure out how to move Snake
// • Figure out how to end game when snake hits wall
// • Figure out how to end game when snake eats itself
// • Figure out how to move snake to food
// • Figure out how to grow snake after eating
// • Figure out how to make food disappear when snake eats food
// • Figure out how to randomly place food on grid
// • Figure out how to set a timer
// • Figure out how to end game when timer ends
// Figure out how to reset time when food is eaten