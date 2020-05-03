let players = ['x', 'o'];
let activePlayer = 0;
let fieldSize = 3;
let winLenght = 3;
let board = [];
let maxFieldSize = 20;

startGame();

function startGame() {    
    if (getFieldSize()) {
        activePlayer = Math.round(Math.random());
        setNewBoard();
        renderBoard(board);
    } else {
        board = [];
        renderBoard(board);
    }
}

function setNewBoard() {
    board = [];
    
    for (let i = 0; i < fieldSize; i++) {
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
            winLenght > maxFieldSize ||
            fieldSize < 3 ||
            fieldSize > maxFieldSize) {
        showAlertFieldSize();
        return false;
    }

    return true;
}

function showAlertFieldSize() {
    alert(`Введите правильные значения:
    
    Размер поля: от 3 до ${maxFieldSize}
    
    Длинну линии для победы от 3 до ${maxFieldSize}
    и не больше размера поля`)
}

function click(row, col) {
    board[row][col] = activePlayer ? 'o' : 'x';
    renderBoard(board);
    
    if (isWinner(players[activePlayer], +row, +col)) {
        showWinner(activePlayer);
    } 

    activePlayer = activePlayer ? 0 : 1;
}


function isWinner(simbol, rowToCheck, colToCheck) {

    // initial conditions
    let steps = 2 * winLenght - 2;
    let startRow = rowToCheck - winLenght + 1;
    let startCol = colToCheck - winLenght + 1;
    let startColPlus = colToCheck + winLenght - 1;

    // check row
    if (isWinnerInLine(rowToCheck, startCol, 0, 1, steps, simbol)) {
        return true;
    }

    // check column
    if (isWinnerInLine(startRow, colToCheck, 1, 0, steps, simbol)) {
        return true;
    }

    // check diag \
    if (isWinnerInLine(startRow, startCol, 1, 1, steps, simbol)) {
        return true;
    }

    // check diag /
    if (isWinnerInLine(startRow, startColPlus, 1, -1, steps, simbol)) {
        return true;
    }
}

function isWinnerInLine(row, col, rowStep, colStep, steps, symbol) {
    // start position (row, col)
    // direction (rowStep, colStep)
    // number of steps
    // symbol fo search

    let winner = 1;
        
    for (let i = 0; i < steps; i++ ) {
        
        // if beyond the field => continue;
        if (row < 0 ||
            col < 0 ||
            row > fieldSize - 1 ||
            col > fieldSize - 1 ||
            row + rowStep < 0 ||
            col + colStep < 0 ||
            row + rowStep > fieldSize - 1 ||
            col + colStep > fieldSize - 1) {
                
                row += rowStep;
                col += colStep;
                
                continue;
            }

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