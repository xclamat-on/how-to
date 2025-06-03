document.addEventListener('DOMContentLoaded', () => {
    // Game state variables
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Winning conditions - indexes of the board that form a winning line
    const winningConditions = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal top-left to bottom-right
        [2, 4, 6]  // Diagonal top-right to bottom-left
    ];
    
    // Messages
    const statusDisplay = document.getElementById('status');
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => 'Game ended in a draw!';
    const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;
    
    // Set initial message
    statusDisplay.innerHTML = currentPlayerTurn();
    
    // Handle cell click
    function handleCellClick(clickedCellEvent) {
        // Get the clicked cell
        const clickedCell = clickedCellEvent.target;
        
        // Get the index of the clicked cell
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        // Check if the cell is already played or if the game is not active
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update the game state and UI
        handleCellPlayed(clickedCell, clickedCellIndex);
        
        // Check if the game is won or drawn
        handleResultValidation();
    }
    
    // Update the game state and UI after a cell is played
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        // Update the game state
        gameState[clickedCellIndex] = currentPlayer;
        
        // Update the UI
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }
    
    // Check if the game is won or drawn
    function handleResultValidation() {
        let roundWon = false;
        
        // Check all winning conditions
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
            
            if (condition) {
                roundWon = true;
                break;
            }
        }
        
        // If the game is won, update the status and end the game
        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }
        
        // Check if the game is drawn
        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }
        
        // If the game is not won or drawn, change the player
        handlePlayerChange();
    }
    
    // Change the current player
    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = currentPlayerTurn();
    }
    
    // Restart the game
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.innerHTML = currentPlayerTurn();
        
        // Clear the board
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x');
            cell.classList.remove('o');
        });
    }
    
    // Add event listeners
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    document.getElementById('restart').addEventListener('click', handleRestartGame);
});
