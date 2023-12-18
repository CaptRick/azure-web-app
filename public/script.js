document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    let snake = [{ x: 10, y: 10 }]; // Initial snake position
    let food = getRandomPosition();
    let direction = 'right';
    let intervalId;

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
            snakeElement.style.gridRow = segment.y + 1;
            snakeElement.style.gridColumn = segment.x + 1;
            board.appendChild(snakeElement);
        });

        // Draw food
        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.gridRow = food.y + 1;
        foodElement.style.gridColumn = food.x + 1;
        board.appendChild(foodElement);
    }

    function move() {
        const head = Object.assign({}, snake[0]);

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

        if (head.x < 0) head.x = 19;
        if (head.x > 19) head.x = 0;
        if (head.y < 0) head.y = 19;
        if (head.y > 19) head.y = 0;

        if (isSnakeCollision(head)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = getRandomPosition();
        } else {
            snake.pop();
        }

        draw();
    }

    function isSnakeCollision(head) {
        return snake.some(segment => segment.x === head.x && segment.y === head.y);
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        food = getRandomPosition();
        direction = 'right';
        clearInterval(intervalId);
        intervalId = setInterval(move, 200);
        draw();
    }

    function gameOver() {
        alert('Game Over!');
        resetGame();
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

    resetGame(); // Start the game
});
