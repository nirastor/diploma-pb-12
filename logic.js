// ***ASK*** how not be confused with who is player-1 and player-2,
// aslo players[0] or players[1],
// also 'X' or 'O'
let players = ['x', 'o'];
let activePlayer;
let fieldSize = 3;
let winLenght = 3;
let board = [];

startGame();

function startGame() {    
    if (getFieldSize()) {
        // ***ASK*** take error with decimal point in math.round in account?
        activePlayer = Math.round(Math.random());
        setNewBoard();
        renderBoard(board);
    }
}

function setNewBoard() {
    board = [];
    
    for (let i  = 0; i < fieldSize; i++) {
        board[i] = [];
        
        for (let j = 0; j < fieldSize; j++) {
            board[i][j] = '';
        }
    } 
}

function getFieldSize () {
    fieldSize = +document.getElementById("field-size").value;
    winLenght = +document.getElementById("wictory-line").value;

    if (winLenght > fieldSize ||
            winLenght < 3 ||
            winLenght > 10 ||
            fieldSize < 3 ||
            fieldSize > 10) {
        showAlertFieldSize();
        return false;
    }

    console.log("fieldSize " + fieldSize);
    console.log("winLenght " + winLenght);

    return true;
}

function showAlertFieldSize() {
    alert(`Введите правильные значения:
    
    Размер поля: от 3 до 10
    
    Длинну линии для победы от 3 до 10
    и не больше размера поля`)
}

function click(row, col) {
    // update and render field
    board[row][col] = activePlayer ? 'o' : 'x';
    renderBoard(board);

    // check winner 
    if (isWinner(players[activePlayer])) {
        showWinner(activePlayer);
    } 

    // new active player
    activePlayer = activePlayer ? 0 : 1;
}

// ***ASK*** isn't isWinner too long and complicated?

function isWinner(simbol) {
    
    //check rows
    for (let i = 0; i < fieldSize; i++) {
        if (isWinnerInLine(i, 0, 0, 1, fieldSize - 1, simbol)) {
            return true;
        }
    }

    //check columns
    for (let i = 0; i < fieldSize; i++) {
        if (isWinnerInLine(0, i, 1, 0, fieldSize - 1, simbol)) {
            return true;
        }
    }

    
    // both diagolals
    // ***ASK*** nuberOfDiagonalToCheck is constant for single field. Is it better to count in once in askFieldSize
    // or to keep it here?
    let nuberOfDiagonalToCheck = 2 * (fieldSize - winLenght) + 1;

    
    //check for left-top to right-bottom 
    
    //set start cell & step for both diagonal
    let row = fieldSize - winLenght;
    let col = 0;
    let steps = winLenght - 1;
    
    for (let i = 0; i < nuberOfDiagonalToCheck; i++) {
        
        if (isWinnerInLine(row, col, 1, 1, steps, simbol)) {
            return true;
        }

        //update start cell for next LT-RB diagonal
        if (row) {
            row--;
        } else {
            col++;
        }

        //update step for next diagonal (any)
        if (steps < fieldSize - 1) {
            steps++;
        } else {
            steps--;
        }
    }

   
    //check for left-bottom to right-top
    row = winLenght - 1;
    col = 0;
    steps = winLenght - 1;
    
    for (let i = 0; i < nuberOfDiagonalToCheck; i++) {
        if (isWinnerInLine(row, col, -1, 1, steps, simbol)) {
            return true;
        }

        //update start position for next LB-RT diagonal
        if (row < fieldSize - 1) {
            row++;
        } else {
            col++;
        }

        //update step for next diagonal (any)
        if (steps < fieldSize - 1) {
            steps++;
        } else {
            steps--;
        }
    }
}

function isWinnerInLine(row, col, rowStep, colStep, steps, symbol) {

    let winner = 1;
        
    for (let i = 0; i < steps; i++ ) {
        
        if (board[row][col] === board[row + rowStep][col + colStep] && board[row][col] === symbol) { 
            winner++;
            if (winner === winLenght) {
                // ***ASK*** May be "super.return" here?
                return true;
            }
        } else {
            winner = 1;
        }

        row += rowStep;
        col += colStep;
    }
}