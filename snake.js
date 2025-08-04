// Game Constants
let direction = { x: 0, y: 0 };
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 6, y: 13 }];
let food = { x: 10, y: 7 };

// Get DOM elements
const board = document.getElementById('board');
const scoreElement = document.getElementById('score');

// Keyboard controls
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y !== 1) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y !== -1) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x !== -1) direction = { x: 1, y: 0 };
            break;
    }
});

// Main game loop
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;

    lastPaintTime = ctime;
    gameEngine();
}

// Collision detection
function isGameOver(snake) {
    // Wall collision
    if (snake[0].x <= 0 || snake[0].x > 18 || snake[0].y <= 0 || snake[0].y > 18) {
        return true;
    }
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

// Game logic
function gameEngine() {
    board.innerHTML = ""; // Clear board

    // Game over check
    if (isGameOver(snakeArr)) {
        alert("Game Over! Refresh to play again.");
        snakeArr = [{ x: 6, y: 13 }];
        direction = { x: 0, y: 0 };
        score = 0;
        scoreElement.innerHTML = `Score: ${score}`;
        return;
    }

    // Update snake position
    const head = {
        x: snakeArr[0].x + direction.x,
        y: snakeArr[0].y + direction.y,
    };
    snakeArr.unshift(head);

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerHTML = `Score: ${score}`;
        // Generate new food at a random position
        food = {
            x: Math.floor(Math.random() * 18) + 1,
            y: Math.floor(Math.random() * 18) + 1,
        };
    } else {
        snakeArr.pop(); // Remove tail
    }

    // Draw snake
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head'); // Snake head
        } else {
            const colors = ['#e91e63', '#ff9800', '#8bc34a', '#00bcd4', '#ffeb3b', '#9c27b0'];
            snakeElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            snakeElement.classList.add('snake'); // Body
        }

        board.appendChild(snakeElement);
    });

    // Draw food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Start the loop
window.requestAnimationFrame(main);
