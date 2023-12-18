document.addEventListener('DOMContentLoaded', () => {
    const fallingAlphabetsContainer = document.getElementById('falling-alphabets');
    const scoreElement = document.getElementById('score');
    let score = 0;

    // Create an array of alphabets
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function createFallingAlphabet() {
        const fallingAlphabet = document.createElement('div');
        fallingAlphabet.classList.add('falling-alphabet');
        fallingAlphabet.style.left = `${Math.random() * window.innerWidth}px`;
        fallingAlphabet.textContent = getRandomAlphabet();
        fallingAlphabetsContainer.appendChild(fallingAlphabet);

        // Move the falling alphabet downward
        let top = 0;
        const intervalId = setInterval(() => {
            top += 5;
            fallingAlphabet.style.top = `${top}px`;

            // Check if the falling alphabet reached the bottom
            if (top > window.innerHeight) {
                clearInterval(intervalId);
                fallingAlphabetsContainer.removeChild(fallingAlphabet);
            }
        }, 20);
    }

    function getRandomAlphabet() {
        const randomIndex = Math.floor(Math.random() * alphabets.length);
        return alphabets[randomIndex];
    }

    document.addEventListener('keydown', (event) => {
        const pressedKey = event.key.toUpperCase();
        const fallingAlphabets = document.querySelectorAll('.falling-alphabet');

        fallingAlphabets.forEach((fallingAlphabet) => {
            if (fallingAlphabet.textContent === pressedKey) {
                score++;
                updateScore();
                fallingAlphabetsContainer.removeChild(fallingAlphabet);
            }
        });
    });

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    // Start the game by creating falling alphabets
    setInterval(() => {
        createFallingAlphabet();
    }, 1000);
});
