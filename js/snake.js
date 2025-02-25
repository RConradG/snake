/*-------------- Constants -------------*/
const boardRows = 30;
const boardColumns = 30;
const tileSize = 35;
let board;
/*---------- Variables (state) ---------*/
// Time/Timer
// Score

let food = {x: 0, y: 0};
let snake = {x: 0, y: 0}
let snakeMovement = {x: 0, y: 0}

/*----- Cached Element References  -----*/

// querySelect start game button
const gameBoard = document.getElementById("board");
const boardContext = gameBoard.getContext("2d")
// const cells = document.querySelectorAll(".cell");

/*----------- Event Listeners ----------*/
const controls = document.addEventListener("keyup", changeDirection);

// will use the keyboard for snake control, might include option to use arrow keys
// Listen for certain keyboard keys to be entered
// I = up
// J = left
// K = right
// N = down
 
// Listen for start button to be pressed (possibly use a keyboard key?)
 
// Listen for pause button to be pressed (possible use keyboard key?)

// Listen for one keyboard key to start, pause, and restart game?


/*-------------- Functions -------------*/
render();
// window.onload = function() {
  
//   update();

// }

function update() {
}

function render() {
  createGameBoard();
  setSnake();
  setFood();
  // setFood();
  // setSnake();
};

function moveSnake(controls) {
  if (controls.code === "ArrowUp") {
    snakeMovement.x = 0;
    snakeMovement.y = -1;
  } else if (controls.code === "ArrowDown") {
    snakeMovement.x = -1;
    snakeMovement.y = 0;
  } else if (controls.code === "ArrowLeft") {
    snakeMovement.x = -1;
    snakeMovement.y = 0;
  } else if (controls.code === "ArrowRight") {
    snakeMovement.x = 1;
    snakeMovement.y = 0;
  }
}

function createGameBoard () {
  gameBoard.height = tileSize * boardRows;
  gameBoard.width = tileSize * boardColumns
  boardContext.fillStyle = "black";
  boardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

function setFood() {
  // ensures food stays within game board
  food.x = getRandomLocation().x; 
  food.y = getRandomLocation().y;
  boardContext.fillStyle = "yellow";
  boardContext.fillRect(food.x, food.y, tileSize, tileSize);
  
}
// TODO: make sure setFood location and setSnake location doesn't match
function setSnake() {
  snake.x = getRandomLocation().x;
  snake.y = getRandomLocation().y;
  boardContext.fillStyle = "green";
  boardContext.fillRect(snake.x, snake.y, tileSize, tileSize);
}

function getRandomLocation() {
  let location = {x: 0, y: 0}
  location.x = Math.floor(Math.random() * boardColumns) * tileSize;
  location.y = Math.floor(Math.random() * boardRows) * tileSize;
  return location;
  
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
