// ***ASK*** how not be confused with who is player-1 and player-2,
// aslo players[0] or players[1],
// also 'X' or 'O'
let players = ['x', 'o'];
let activePlayer;
let fieldSize;
let winLenght;
let board = [];

function startGame() {
    askFieldSize();   

    // ***ASK*** take error with decimal point in math.round in account?
    activePlayer = Math.round(Math.random());

    createAndRenderBoard();
}

function createAndRenderBoard() {
    // ***ASK*** is this correct way to reset array?
    board = [];
    
    // ***ASK*** is this correct way to create array of array?
    for (let i  = 0; i < fieldSize; i++) {
        board[i] = [];
        
        for (let j = 0; j < fieldSize; j++) {
            board[i][j] = '';
        }
    }

    renderBoard(board);
}

function askFieldSize () {
    let isWrong = false;
    // ***ASK*** странно но если присваивать и объявлять одновременно внуртри то не работает
    
    do {
        fieldSize = + prompt('Введите размер поля. Не меньше 3', 3);
        winLenght = + prompt('Введите длинну линии для победы. Не меньше 3 и не больше размера поля', 3);

        isWrong = winLenght > fieldSize || winLenght < 3 || fieldSize < 3;
        
        if (isWrong) {
            alert('Введите правильные значения');
        }
    } while (isWrong);
}

function click(row, col) {
    // update and render field
    board[row][col] = activePlayer ? 'x' : 'o';
    renderBoard(board);

    // переписать логику: checkWinner должен быть isWinner 
    // передавать какой это игрок (или сразу его символ)
    // проверять на победу только по этому символу (вдвое сократиться код пцикла проверки)
    // если это победитель, отдавать true
    // уберется переменная result
    // если пришло true отдавать в отрисовку номер этого победителя

    // check winner 
    if (checkWinner() === 'x') {
        showWinner(0);
    } else if (checkWinner() === 'o') {
        showWinner(1);
    }

    // new active player
    activePlayer = activePlayer ? 0 : 1;
}

// ***ASK*** isn't checkWinner too long and complicated?

function checkWinner() {
    
    let result;
    
    //check rows
    for (let i = 0; i < fieldSize; i++) {
        result = checkWinnerInLine(i, 0, 0, 1, fieldSize - 1);

        // ***ASK*** how to stop parent functuion when child do not return false
        if (result) {
            return result;
        }
    }

    //check columns
    for (let i = 0; i < fieldSize; i++) {
        result = checkWinnerInLine(0, i, 1, 0, fieldSize - 1);

        // ***ASK*** how to stop parent functuion when child do not return false
        if (result) {
            return result;
        }
    }

    // both diagolals
    let nuberOfDiagonalToCheck = 2 * (fieldSize - winLenght) + 1;

    //check for left-top to right-bottom 
    
    //set start cell & step for both diagonal
    let row = fieldSize - winLenght;
    let col = 0;
    let steps = winLenght - 1;
    
    for (let i = 0; i < nuberOfDiagonalToCheck; i++) {
        
        result = checkWinnerInLine(row, col, 1, 1, steps);

        // ***ASK*** how to stop parent functuion when child do not return false
        if (result) {
            return result;
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
        
        result = checkWinnerInLine(row, col, -1, 1, steps);

        // ***ASK*** how to stop parent functuion when child do not return false
        if (result) {
            return result;
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

function checkWinnerInLine(row, col, rowStep, colStep, steps) {

    let winnerX = 1;
    let winnerZero = 1;
        
    for (let i = 0; i < steps; i++ ) {
        
        if (board[row][col] === board[row + rowStep][col + colStep] && board[row][col] === 'x') { 
            winnerX++;
            winnerZero = 1;
        }

        if (board[row][col] === board[row + rowStep][col + colStep] && board[row][col] === 'o') {
            winnerZero++;
            winnerX = 1;
        }

        // ***ASK*** is this kind of return type is correct?
        if (winnerX === winLenght) {
            return 'x';
        }

        if (winnerZero === winLenght) {
            return 'o';
        }

        row += rowStep;
        col += colStep;
    }
}