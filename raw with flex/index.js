// Get the canvas element
const canvas = document.getElementById('canvas');
// Get the canvas context
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Define the snake and food positions
let snake = [{ x: 200, y: 200 }, { x: 210, y: 200 }, { x: 220, y: 200 }];
let food = { x: 100, y: 100 };

// Define the snake direction
let direction = 'right';

// Define the score
let score = 0;

// Draw the snake and food
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);
}

// Update the snake position
function update() {
    const head = snake[0];
    const newHead = { x: head.x, y: head.y };
    switch (direction) {
        case 'right':
            newHead.x += 10;
            break;
        case 'left':
            newHead.x -= 10;
            break;
        case 'up':
            newHead.y -= 10;
            break;
        case 'down':
            newHead.y += 10;
            break;
    }
    snake.unshift(newHead);
    if (snake.length > score + 3) {
        snake.pop();
    }
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width - 10)),
            y: Math.floor(Math.random() * (canvas.height - 10))
        };
    }
}

// Handle key presses
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
    }
});

// Main loop
setInterval(() => {
    update();
    draw();
}, 100);