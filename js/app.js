/*-------------- Constants -------------*/

// font
const FONT = new FontFace(
  "arcadeClassic",
  'url("../resources/fonts/ARCADECLASSIC.TTF")'
);

// board
const ROWS = 15;
const COLUMNS = 15;
const TILE_SIZE = 40;
const RESET_GAME_MESSAGE = `Game Over! Play again? Click reset button.`;

// images

const BRISKET_IMAGE = new Image();
BRISKET_IMAGE.src = "./resources/pictures/brisket.png";
BRISKET_IMAGE.setAttribute("alt", "Brisket Sandwich");

const SNAKE_IMAGE = new Image();
SNAKE_IMAGE.src = "./resources/pictures/ds.png";

// audio
const RESET_AUDIO = new Audio("./resources/sounds/reset.mp3");
RESET_AUDIO.volume = 0.45;

const GAMEPLAY_AUDIO = new Audio("./resources/sounds/gameplay-music-2.mp3");
GAMEPLAY_AUDIO.loop = true;
GAMEPLAY_AUDIO.volume = 0.5;

const GAME_OVER_AUDIO = new Audio("./resources/sounds/game-over.mp3");

// misc.
const SCORE_INCREMENT = 10;

/*---------- Variables (state) ---------*/

//snake head
let snake = setSnake();
let snakeBody = [];

let snakeVelocity = { x: 0, y: 0 };
let food = { x: 0, y: 0 };

let gameOver = false;
let gameInterval;

let playerScore = 0;
let highScore = 0;

/*----- Cached Element References  -----*/

const gameBoardEl = document.getElementById("board");

const gameBoardContextEl = gameBoardEl.getContext("2d");

const resetButtonEl = document.getElementById("reset-button");

const scoreElement = document.getElementById("score");

const highScoreElement = document.getElementById("high-score");

const timeElement = document.getElementById("time");

/*----------- Event Listeners ----------*/

resetButtonEl.addEventListener("click", resetGame);

/*------------- Functions --------------*/

render();

function render() {
  // moved event listener due to audio pausing after refreshing page
  // removed an event listener after key press, thus adding here
  document.addEventListener("keyup", moveSnake);
  setGameBoardDimensions();
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

function setGameBoardDimensions() {
  gameBoardEl.height = ROWS * TILE_SIZE;
  gameBoardEl.width = COLUMNS * TILE_SIZE;
}

function fillGameBoard() {
  const boardGradient = gameBoardContextEl.createLinearGradient(
    gameBoardEl.width,
    0,
    gameBoardEl.width,
    gameBoardEl.height
  );

  boardGradient.addColorStop(0, " #1f1b79");
  boardGradient.addColorStop(0.25, " #4b3f97");
  boardGradient.addColorStop(0.5, " #6a5db1");
  boardGradient.addColorStop(0.75, " #a65fc4");
  boardGradient.addColorStop(1, " #e76fab");

  gameBoardContextEl.fillStyle = boardGradient;
  gameBoardContextEl.fillRect(0, 0, gameBoardEl.width, gameBoardEl.height);
}

function setFood() {
  food.x = pickRandomNumbers().x;
  food.y = pickRandomNumbers().y;
}

function fillFood() {
  gameBoardContextEl.fillStyle = "red";
  gameBoardContextEl.drawImage(
    BRISKET_IMAGE,
    food.x,
    food.y,
    TILE_SIZE,
    TILE_SIZE
  );
}

function increaseScore() {
  playerScore += SCORE_INCREMENT;
  let scoreString = `Score: ${playerScore}`;
  scoreElement.textContent = scoreString;
}

function setHighScore() {
  if (playerScore > highScore) {
    highScore = playerScore;
    highScoreElement.textContent = `High Score: ${highScore}`;
  }
}

function checkFoodAndSnake() {
  if (snake.x == food.x && snake.y == food.y) {
    snakeBody.push([food.x, food.y]);
    setFood();
    increaseScore();
    setHighScore();
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
      snakeBody[i][0] + TILE_SIZE / 2, // Center X
      snakeBody[i][1] + TILE_SIZE / 2, // Center Y
      TILE_SIZE / 2, // Radius
      0,
      Math.PI * 2 // Full circle
    );
    gameBoardContextEl.fill();
  }
}

function resetGame() {
  snake = setSnake();
  snakeBody = [];
  snakeVelocity = { x: 0, y: 0 };
  food = { x: 0, y: 0 };
  playerScore = 0;
  scoreElement.textContent = `Score: ${playerScore}`;
  gameOver = false;
  clearInterval(gameInterval);
  RESET_AUDIO.play();

  render();
}

function setSnake() {
  let snakeLocation = { x: pickRandomNumbers().x, y: pickRandomNumbers().y };
  return snakeLocation;
}

async function showGameOverMessage() {
  await document.fonts.ready;
  gameBoardContextEl.fillStyle = "rgba(0, 0, 0, 0.5)"; // semi-transparent background
  gameBoardContextEl.fillRect(0, 0, gameBoardEl.width, gameBoardEl.height);
  gameBoardContextEl.fillStyle = "white";
  gameBoardContextEl.font = "26px Arial";
  gameBoardContextEl.textAlign = "center";
  gameBoardContextEl.fillText(
    RESET_GAME_MESSAGE,
    gameBoardEl.width / 2,
    gameBoardEl.height / 2
  );
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
    FONT.load().then(() => {
      document.fonts.add(FONT);
      showGameOverMessage();
    });
  }
  // checks if snake eats itself
  for (let i = 0; i < snakeBody.length; i++) {
    if (snake.x == snakeBody[i][0] && snake.y == snakeBody[i][1]) {
      gameOver = true;
      stopGame();
      FONT.load().then(() => {
        document.fonts.add(FONT);
        showGameOverMessage();
      });
    }
  }
}

function stopGame() {
  document.removeEventListener("keyup", moveSnake);
  GAME_OVER_AUDIO.play();
  GAMEPLAY_AUDIO.pause();
  snake = {};
}

function moveSnake(e) {
  // && snakeVelocity statement checks to
  // ensure snake doesn't eat itself
  GAMEPLAY_AUDIO.play();

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
  let randomNumbers = { x: 0, y: 0 };
  randomNumbers.x = Math.floor(Math.random() * COLUMNS) * TILE_SIZE;
  randomNumbers.y = Math.floor(Math.random() * ROWS) * TILE_SIZE;
  return randomNumbers;
}
