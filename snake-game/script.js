// DEFINE HTML ELEMENTS
const board = document.querySelector(".game-board");
const instructionText = document.querySelector(".instruction-text");
const logo = document.querySelector(".logo");
const score = document.querySelector(".score");
const highScoreText = document.querySelector(".highScore");

// GENERATE FOOD
const generateFood = () => {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
};

// DEFINE GAME VARIABLES
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;

// DRAW SNAKE
const drawSnake = () => {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
};

//DRAW FOOD
const drawFood = () => {
  if (gameStarted) {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
  }
};

// CALL FUNC TO CREATE THE INITIAL SET UP
const draw = () => {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
};

// CREATE A SNAKE OR FOOD CUBE
const createGameElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// SET THE POSITION OF THE SNAKE OR THE FOOD
const setPosition = (element, position) => {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
};

// MAKE THE SNAKE MOVE
const move = () => {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); // clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
};

// START GAME FUNC
const startGame = () => {
  gameStarted = true; // keep track of the running game
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
};

// KEYPRESS EVENT LISTENER
const handleKeyPress = (event) => {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === "")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
};

document.addEventListener("keydown", handleKeyPress);

// REDUCE THE INCREASE IN SPEED WITH MORE FOOD EATEN
const increaseSpeed = () => {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
};

// RESET THE GAME IF SNAKE HITS ITS OWN BODY OR THE WALL
const checkCollision = () => {
  const head = snake[0];

  // if hits the wall
  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }
  // if collides with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
};

// KEEP TRACK OF THE SCORE
const updateScore = () => {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, "0");
};

// STOP THE GAME
const stopGame = () => {
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = "block";
  logo.style.display = "block";
};

// UPDATE HIGH SCORE
const updateHighScore = () => {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, "0");
  }
  highScoreText.style.display = "block";
};

// RESET THE GAME
const resetGame = () => {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
  updateScore();
};
