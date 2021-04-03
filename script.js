
const board = (() =>{
const player1 = 'X';
const player2 = 'O';
const gameStatus = document.getElementById('text');
return{player1,player2, gameStatus, player1,player2}
})();

const gamePlay = (() =>{
    const drawMessage = () => 'It\'s a draw';
    const winMessage = () => `${currentPlayer} has won!`;
    let currentPlayer = board.player1;
    let gameActive = true;
    let gameState = ['','','','','','','','',''];

    const CellClick = (clickedCellEvent) =>{
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedCellIndex] !=='' || !gameActive){
            return
        }
        CellPlayed(clickedCell, clickedCellIndex);
        ResultValidation();
        }

    const PlayerChange = () =>{
        if(currentPlayer === board.player1){
            currentPlayer = board.player2;
            currentPlayerName = board.player2;
        }else{
            currentPlayer = board.player1;
            currentPlayerName = board.player1;
        }
    board.gameStatus.textContent = playerTurn(); 
    }

    const RestartGame = () =>{
        gameActive = true;
        gameState = ['','','','','','','','',''];
        board.gameStatus.textContent = playerTurn();
        document.querySelectorAll('.grid-item').forEach(cell => cell.innerHTML = "");
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const ResultValidation = () =>{
        let roundWon = false;
        for(let i=0; i <=7; i++){
            const winCondition = winningConditions[i];

            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
        if(a === '' || b ==='' || c === ''){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break;
        }

         }
        if(roundWon){
            board.gameStatus.textContent = winMessage();
            gameActive = false;
            return;
        }
        
        if (!gameState.includes('')){
            board.gameStatus.textContent = drawMessage();
            gameActive = false;
            return;
        }
    PlayerChange();
}

const playerTurn = () => `It's ${currentPlayer}'s turn`;
    board.gameStatus.textContent = playerTurn();
    const CellPlayed = (clickedCell, clickedCellIndex) =>{
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    }
document.querySelectorAll('.grid-item').forEach(cell => cell.addEventListener('click',CellClick));

document.getElementById('btn').addEventListener('click',RestartGame);

return{currentPlayer, winMessage, drawMessage}
})();




