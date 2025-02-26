// /*-------------- Constants -------------*/

//board
const ROWS = 15;
const COLUMNS = 15;
const TILE_SIZE = 40;
const RESET_GAME_MESSAGE = `Game Over! Play again? Click reset button.`

const APPLE_IMAGE = new Image();
APPLE_IMAGE.src = "./resources/pictures/apple.jpg";

const SNAKE_IMAGE = new Image();
SNAKE_IMAGE.src = "./resources/pictures/snake-head.jpeg";
// /*---------- Variables (state) ---------*/

//snake head
let snake = setSnake();
let snakeBody = [];

let snakeVelocity = { x: 0, y: 0 };
let food = { x: 0, y: 0 };

let gameOver = false;
let gameInterval;
// let restart = false;

// /*----- Cached Element References  -----*/

const gameBoardEl = document.getElementById("board");

// allows for drawing on the canvas HTML element
const gameBoardContextEl = gameBoardEl.getContext("2d");
const resetButtonEl = document.getElementById("reset-button")

// /*----------- Event Listeners ----------*/

document.addEventListener("keyup", moveSnake);
resetButtonEl.addEventListener("click", resetGame)

// /*------------- Functions --------------*/

render();

function render() {
  createGameBoard();
  setFood();
  gameInterval = setInterval(update, 1000 / 10);
}

function update() {
  if (gameOver) {
    return;
  }
  fillGameBoard();
  fillFood();
  checkFoodAndSnake();
  addSnakeBody();
  fillSnakeBody();
  checkForGameOverConditions();
}

function resetGame() {
  snake = setSnake();
  snakeBody = [];
  snakeVelocity = { x: 0, y: 0 };
  food = { x: 0, y: 0 };
  gameOver = false;
  clearInterval(gameInterval);
  render();
}

function setSnake() {
  let snakeLocation = {x: pickRandomNumbers().x, y: pickRandomNumbers().y};
  return snakeLocation;
}

function fillGameBoard() {
  gameBoardContextEl.fillStyle = "#1B1B1B";
  gameBoardContextEl.fillRect(0, 0, gameBoardEl.width, gameBoardEl.height);
}

function createGameBoard() {
  gameBoardEl.height = ROWS * TILE_SIZE;
  gameBoardEl.width = COLUMNS * TILE_SIZE;
}

function fillFood() {
  gameBoardContextEl.fillStyle = "red";
  gameBoardContextEl.drawImage(
    APPLE_IMAGE,
    food.x,
    food.y,
    TILE_SIZE,
    TILE_SIZE
  );
}

function showGameOverMessage() {
  gameBoardContextEl.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent background
  gameBoardContextEl.fillRect(0, 0, gameBoardEl.width, gameBoardEl.height);

  gameBoardContextEl.fillStyle = "white";
  gameBoardContextEl.font = "26px Arial";
  gameBoardContextEl.textAlign = "center";
  gameBoardContextEl.fillText(RESET_GAME_MESSAGE, gameBoardEl.width/2 , gameBoardEl.height/2);
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
  gameBoardContextEl.fillStyle = "#FFDD44";
  snake.x += snakeVelocity.x * TILE_SIZE;
  snake.y += snakeVelocity.y * TILE_SIZE;
  gameBoardContextEl.drawImage(
    SNAKE_IMAGE,
    snake.x,
    snake.y,
    TILE_SIZE,
    TILE_SIZE
  );
  for (let i = 0; i < snakeBody.length; i++) {
    gameBoardContextEl.beginPath();
    gameBoardContextEl.arc(
      snakeBody[i][0] + TILE_SIZE / 2,  // Center X
      snakeBody[i][1] + TILE_SIZE / 2,  // Center Y
      TILE_SIZE / 2,  // Radius
      0, Math.PI * 2  // Full circle
    );
    gameBoardContextEl.fill();
  }
  
}

function checkForGameOverConditions() {
  if (
    snake.x < 0 ||
    snake.x >= COLUMNS * TILE_SIZE ||
    snake.y < 0 ||
    snake.y >= ROWS * TILE_SIZE
  ) {
    gameOver = true;
    stopGame();
    showGameOverMessage();
  }
  // checks if snake eats itself
  for (let i = 0; i < snakeBody.length; i++) {
    if (snake.x == snakeBody[i][0] && snake.y == snakeBody[i][1]) {
      gameOver = true;
      stopGame();
      showGameOverMessage();
    }
  }
}

function stopGame() {
  snake = {};
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

function pickRandomNumbers() {
  let randomNumbers = {x: 0, y: 0};
  randomNumbers.x = Math.floor(Math.random() * COLUMNS) * TILE_SIZE;
  randomNumbers.y = Math.floor(Math.random() * ROWS) * TILE_SIZE;
  return randomNumbers;
}

function setFood() {
  food.x = pickRandomNumbers().x;
  food.y = pickRandomNumbers().y;
}
