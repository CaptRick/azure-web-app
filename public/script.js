document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const pacman = createEntity('pacman', 1, 1);
    const ghosts = [createEntity('ghost', 10, 10), createEntity('ghost', 15, 5)];

    board.appendChild(pacman);
    ghosts.forEach(ghost => board.appendChild(ghost));

    document.addEventListener('keydown', (event) => {
        moveEntity(pacman, event.key);
    });

    setInterval(() => {
        ghosts.forEach(ghost => moveEntity(ghost, getRandomDirection()));
    }, 1000);

    function createEntity(className, x, y) {
        const entity = document.createElement('div');
        entity.className = className;
        entity.style.gridRow = y + 1;
        entity.style.gridColumn = x + 1;
        return entity;
    }

    function moveEntity(entity, direction) {
        let x = parseInt(entity.style.gridColumn) - 1;
        let y = parseInt(entity.style.gridRow) - 1;

        switch (direction) {
            case 'ArrowUp':
                y = Math.max(0, y - 1);
                break;
            case 'ArrowDown':
                y = Math.min(19, y + 1);
                break;
            case 'ArrowLeft':
                x = Math.max(0, x - 1);
                break;
            case 'ArrowRight':
                x = Math.min(19, x + 1);
                break;
        }

        entity.style.gridRow = y + 1;
        entity.style.gridColumn = x + 1;
    }

    function getRandomDirection() {
        const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        return directions[Math.floor(Math.random() * directions.length)];
    }
});
