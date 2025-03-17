# 🐍 Snake Game

A simple Snake game built using **JavaScript**, **HTML**, and **CSS**.

## 🎮 Play the Game

👉 [Click here to play](https://snake-mini-game.netlify.app/)

## 🛠 Features

- Classic snake movement controlled with arrow keys
- Food generation with increasing difficulty
- Score tracking with a high score display
- Game resets on collision with walls or itself
- Smooth animations and speed adjustments

## 🚀 How to Play

1. **Start the game** by pressing `Spacebar`.
2. **Control the snake** with the arrow keys:
   - ⬆ `ArrowUp` → Move Up
   - ⬇ `ArrowDown` → Move Down
   - ⬅ `ArrowLeft` → Move Left
   - ➡ `ArrowRight` → Move Right
3. **Eat the food** to grow longer.
4. **Avoid crashing** into the walls or yourself!
5. **Try to beat your high score!**

## 📜 Code Overview

The game works by:

- **Generating Food:** Food appears at a random position within the grid.
- **Drawing Elements:** The snake and food are dynamically rendered in the grid.
- **Handling Movement:** The snake moves in a chosen direction and grows when eating food.
- **Collision Detection:** If the snake collides with walls or itself, the game resets.
- **Speed Adjustment:** The game gradually speeds up as the player progresses.

### Key Functions in `script.js`

```javascript
const generateFood = () => {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
};
```

- Randomly generates a food position within the grid.

```javascript
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
  } else {
    snake.pop();
  }
};
```

- Updates the snake's movement and handles food consumption.
