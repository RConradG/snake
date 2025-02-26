// /*-------------- Constants -------------*/

//board
const ROWS = 35;
const COLUMNS = 35;
const TILE_SIZE = 25;

// /*---------- Variables (state) ---------*/

//snake head
let snake = {x: TILE_SIZE * 5, y: TILE_SIZE * 5}
let snakeBody = [];

let snakeVelocity = {x: 0, y: 0}
let food = {x: 0, y: 0}

let gameOver = false;

// /*----- Cached Element References  -----*/

const gameBoardEl = document.getElementById("board");

// allows for drawing on the canvas HTML element
const gameBoardContextEl = gameBoardEl.getContext("2d");

// /*----------- Event Listeners ----------*/
document.addEventListener("keyup", moveSnake);

render();

function render() {
  createBoard();
  setFood();
  setInterval(update, 1000 / 10); 
};

function update() {
  if (gameOver) {
    return;
  }
  fillBoard();
  fillFood();
  checkFoodAndSnake();
  addSnakeBody();
  fillSnakeBody();
  checkForGameOverConditions();

}

function fillBoard() {
  gameBoardContextEl.fillStyle = "blue";
  gameBoardContextEl.fillRect(0, 0, gameBoardEl.width, gameBoardEl.height);
}

function createBoard() {
  gameBoardEl.height = ROWS * TILE_SIZE;
  gameBoardEl.width = COLUMNS * TILE_SIZE;
}

function fillFood() {
  gameBoardContextEl.fillStyle = "red";
  gameBoardContextEl.fillRect(food.x, food.y, TILE_SIZE, TILE_SIZE);
}

function checkFoodAndSnake() {
  if (snake.x == food.x && snake.y == food.y) {
    snakeBody.push([food.x, food.y]);
    setFood();
  }
}

function addSnakeBody() {
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snake.x, snake.y];
  }
}

function fillSnakeBody() {
  gameBoardContextEl.fillStyle = "black";
  snake.x += snakeVelocity.x * TILE_SIZE;
  snake.y += snakeVelocity.y * TILE_SIZE;
  gameBoardContextEl.fillRect(snake.x, snake.y, TILE_SIZE, TILE_SIZE);
  for (let i = 0; i < snakeBody.length; i++) {
    gameBoardContextEl.fillRect(
      snakeBody[i][0],
      snakeBody[i][1],
      TILE_SIZE,
      TILE_SIZE
    );
  }
}

function checkForGameOverConditions() {
  if (
    snake.x < 0 ||
    snake.x > COLUMNS * TILE_SIZE ||
    snake.y < 0 ||
    snake.y > ROWS * TILE_SIZE
  ) {
    gameOver = true;
    alert("Game Over");
  }
  // checks if snake eats itself
  for (let i = 0; i < snakeBody.length; i++) { 
    if (snake.x == snakeBody[i][0] && snake.y == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }

}

function moveSnake(e) {
  // && snakeVelocity statement checks to 
  // ensure snake doesn't eat itself
  if (e.code == "ArrowUp" && snakeVelocity.y != 1) {
    snakeVelocity.x = 0;
    snakeVelocity.y = -1;
  } else if (e.code == "ArrowDown" && snakeVelocity.y != -1) {
    snakeVelocity.x = 0;
    snakeVelocity.y = 1;
  } else if (e.code == "ArrowLeft" && snakeVelocity.x != 1) {
    snakeVelocity.x = -1;
    snakeVelocity.y = 0;
  } else if (e.code == "ArrowRight" && snakeVelocity.x != -1) {
    snakeVelocity.x = 1;
    snakeVelocity.y = 0;
  }
}

function setFood() {
  //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
  food.x = Math.floor(Math.random() * COLUMNS) * TILE_SIZE;
  food.y = Math.floor(Math.random() * ROWS) * TILE_SIZE;
}

