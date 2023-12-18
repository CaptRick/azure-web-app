document.addEventListener('DOMContentLoaded', () => {
    const molesContainer = document.getElementById('moles-container');
    const scoreElement = document.getElementById('score');
    let score = 0;

    molesContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('mole')) {
            score++;
            updateScore();
            hideMole(event.target);
        }
    });

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    function showMole() {
        const mole = document.createElement('div');
        mole.classList.add('mole');
        mole.style.top = `${Math.random() * 300}px`;
        mole.style.left = `${Math.random() * 300}px`;
        molesContainer.appendChild(mole);

        setTimeout(() => {
            hideMole(mole);
        }, 1000 + Math.random() * 2000); // Moles appear for 1-3 seconds
    }

    function hideMole(mole) {
        molesContainer.removeChild(mole);
        showMole(); // Show a new mole after hiding the previous one
    }

    // Start the game by showing the first mole
    showMole();
});
