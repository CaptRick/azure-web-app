document.addEventListener('DOMContentLoaded', () => {
    // const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    const symbols = Array.from({ length: 26 }, (_, index) => String.fromCharCode('A'.charCodeAt(0) + index));

    const cards = [...symbols, ...symbols]; // Duplicate symbols for matching pairs
    let flippedCards = [];

    const memoryGame = document.querySelector('.memory-game');

    // Shuffle the cards array
    cards.sort(() => Math.random() - 0.5);

    // Create card elements dynamically
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        
        const cardContent = document.createElement('div');
        cardContent.textContent = symbol;

        card.appendChild(cardContent);
        memoryGame.appendChild(card);
    });

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            card1.classList.add('matched');
            card2.classList.add('matched');
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];

        // Check for win
        if (document.querySelectorAll('.matched').length === cards.length) {
            alert('Congratulations! You matched all pairs!');
        }
    }
});
