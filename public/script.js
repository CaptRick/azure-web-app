document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const rack = document.getElementById('rack');
    const submitBtn = document.getElementById('submitBtn');
    const scoreElement = document.getElementById('score');
    
    let score = 0;
    let selectedTiles = [];

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Generate initial tiles on the board
    for (let i = 0; i < 100; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = getRandomLetter();
        tile.addEventListener('click', () => toggleTile(tile));
        gameBoard.appendChild(tile);
    }

    // Generate initial tiles in the player's rack
    for (let i = 0; i < 7; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = getRandomLetter();
        tile.addEventListener('click', () => toggleTile(tile));
        rack.appendChild(tile);
    }

    submitBtn.addEventListener('click', () => submitWord());

    function getRandomLetter() {
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    function toggleTile(tile) {
        if (selectedTiles.includes(tile)) {
            tile.style.backgroundColor = '#61dafb';
            selectedTiles = selectedTiles.filter(selectedTile => selectedTile !== tile);
        } else {
            tile.style.backgroundColor = '#ff6347';
            selectedTiles.push(tile);
        }
    }

    function submitWord() {
        const word = selectedTiles.map(tile => tile.textContent).join('');
        if (isValidWord(word)) {
            score += calculateScore(word);
            updateScore();
            replaceSelectedTiles();
        } else {
            alert('Invalid word!');
        }
    }

    function isValidWord(word) {
        // In a real Scrabble game, you would validate the word against a dictionary.
        // For simplicity, this example considers any non-empty string as a valid word.
        return word.length > 0;
    }

    function calculateScore(word) {
        // In a real Scrabble game, you would calculate the score based on tile values.
        // For simplicity, this example gives 1 point for each letter in the word.
        return word.length;
    }

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    function replaceSelectedTiles() {
        selectedTiles.forEach(tile => {
            const newLetter = getRandomLetter();
            tile.textContent = newLetter;
            tile.style.backgroundColor = '#61dafb';
        });
        selectedTiles = [];
    }
});
