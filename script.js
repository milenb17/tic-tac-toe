
// render display, update board aray, check for winner?
let gameBoard = (function() {
    let boardArray = [null, null, null, null, null, null, null, null, null];
    
    function renderDisplay() {
        for (let i = 0; i < 9; i++) {
                let td = document.querySelector(`td.t${i}`);
                td.textContent = boardArray[i];
        }
    }
    function resetBoardArray() {
        for (let i = 0; i < 9; i++) {
                boardArray[i] = null;
            }
    }
    function updateBoardArray(td, str) {
        boardArray[parseInt(td[1])] = str;
    }
    function validMove(td) {
        return (boardArray[parseInt(td[1])] === null)
    }
    // either no winner, player x winner, player o winner
    function checkWinner() {
        // vertical line
        for (let i of [0,3,6]) {
            if (boardArray[i] === boardArray[i+1] && boardArray[i] === boardArray[i+2]) {
                return boardArray[i];
            }
        }
        // horizontal line
        for (let i of [0,1,2]) {
            if (boardArray[i] === boardArray[i+3] && boardArray[i] === boardArray[i+6]) {
                return boardArray[i];
            }
        }
        //diagonal
        if (boardArray[0] === boardArray[4] && boardArray[0] === boardArray[8]) {
            return boardArray[0];
        }
        if (boardArray[2] === boardArray[4] && boardArray[2] === boardArray[6]) {
            return boardArray[2];
        }
        //tie
        if (boardArray.every(element => element !== null)) {
            return 't';
        }
        return null;
    }
    
    return {renderDisplay, checkWinner, updateBoardArray, validMove, resetBoardArray, boardArray};
})();


let flowController = (function() {
    const btn = document.querySelector('#restart');
    const paraPlayer = document.querySelector('.player');
    const paraWinner = document.querySelector('.winner');
    const tds = Array.from(document.querySelectorAll('td'));
    const toggleTurn = () => turn === 'X' ? turn = 'O' : turn = 'X';
    let turn = 'X';


    function executeMove(e) {
        if (gameBoard.validMove(e.target.className)) {
            gameBoard.updateBoardArray(e.target.className, turn);
            gameBoard.renderDisplay();
            let result = gameBoard.checkWinner();
            if (result) {
                if (result === 't') {
                    paraWinner.textContent = `Its a tie! Game Over!`;
                }
                else {
                    paraWinner.textContent = `Player ${result} Wins! Game Over!`;
                }
                tds.forEach(td => {td.removeEventListener('click', executeMove)});
                return;
            }
            toggleTurn();
            paraPlayer.textContent = `Player ${turn}'s turn.`;
        }
        else {alert("Invalid Move!")}   
    }
    function restart() {
        gameBoard.resetBoardArray();
        gameBoard.renderDisplay();
        turn = 'X';
        paraPlayer.textContent = `Player ${turn}'s turn.`;
        paraWinner.textContent = '';
        tds.forEach(td => {td.addEventListener('click', executeMove)});
    }

    function playGame() {
        paraPlayer.textContent = `Player ${turn}'s turn.`;
        tds.forEach(td => {td.addEventListener('click', executeMove)});
        btn.addEventListener('click', restart);
    }
    return {playGame}

})();

flowController.playGame();