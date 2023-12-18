document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    let snake = [{ x: 10, y: 10 }];
    let food = getRandomPosition();
    let direction = 'right';

    function getRandomPosition() {
        return {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    }

    function draw() {
        board.innerHTML = '';

        // Draw snake
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.classList.add('snake');
            snakeElement.style.gridRowStart = segment.y + 1;
            snakeElement.style.gridColumnStart = segment.x + 1;
            board.appendChild(snakeElement);
        });

        // Draw food
        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.gridRowStart = food.y + 1;
        foodElement.style.gridColumnStart = food.x + 1;
        board.appendChild(foodElement);
    }

    function move() {
        const head = Object.assign({}, snake[0]); // Clone the head of the snake

        // Update the head position based on the direction
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Check for collisions with walls or itself
        if (
            head.x < 0 || head.x >= 20 ||
            head.y < 0 || head.y >= 20 ||
            isSnakeCollision(head)
        ) {
            alert('Game Over!');
            resetGame();
            return;
        }

        snake.unshift(head); // Add the new head to the front of the snake

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
            food = getRandomPosition();
        } else {
            snake.pop(); // Remove the tail if no collision with food
        }

        draw(); // Redraw the game board
    }

    function isSnakeCollision(head) {
        return snake.some(segment => segment.x === head.x && segment.y === head.y);
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        food = getRandomPosition();
        direction = 'right';
        draw();
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    });

    setInterval(move, 200); // Move the snake every 200 milliseconds
    draw(); // Initial draw of the game board
});
