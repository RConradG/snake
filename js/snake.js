/*-------------- Constants -------------*/
const boardRows = 20;
const boardColumns = 20;
const tileSize = 30;
let context;
let board;
/*---------- Variables (state) ---------*/
// Time/Timer
// Score

let food;
let snake;
let snakeLocation = [{ x: 10, y: 10 }];

 
 /*----- Cached Element References  -----*/
 
// querySelect start game button
const gameBoard = document.getElementById("board");
// const cells = document.querySelectorAll(".cell");

/*-------------- Functions -------------*/
render();
// window.onload = function() {
  
//   update();
  
// }

function update() {
}

function render() {
  createGameBoard();
  // setFood();
  // setSnake();
};


function createGameBoard () {
  gameBoard.height = tileSize * boardRows;
  gameBoard.width = tileSize * boardColumns
  context = gameBoard.getContext("2d")
  context.fillStyle = "black";
  context.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

// function setFood() {
//   food = document.getElementById("cell-38");
//   // food.setAttribute("class", "food");
//   food.classList.add("food") // maybe use?
// }

// function setSnake() {
//   snake = cells[3];
//   snake.setAttribute("class", "snake");
// }
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
