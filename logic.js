// ***ASK*** how not to be confused with who is player-1 and player-2,
// aslo players[0] or players[1],
// also 'X' or 'O'
let players = ['x', 'o'];
let activePlayer = 0;
let fieldSize = 3;
let winLenght = 3;
let board = [];

function startGame() {
    // ask user for field size and win length
    // ***TODO*** need alert
    do {
        fieldSize = + prompt('Введите размер поля. Не меньше 3', 3);
        winLenght = + prompt('Введите длинну линии для победы. Не меньше 3 и не больше размера поля', 3);
    } while (winLenght > fieldSize || winLenght < 3 || fieldSize < 3)

    // ***ASK*** take error with decimal point in math.round?
    activePlayer = Math.round(Math.random());

    // ***ASK*** is it correct way to reset array?
    board = [];

    //create and array of array
    for (let i = 0; i < fieldSize; i++) {
        board[i] = [];
        
        for (let j = 0; j < fieldSize; j++) {
            board[i][j] = '';
        }
    }

    renderBoard(board);
}

function click(row, col) {
    //update and render field
    board[row][col] = activePlayer ? 'x' : 'o';
    renderBoard(board);

    if (checkWinner() === 'x') {
        showWinner(0);
    } else if (checkWinner() === 'o') {
        showWinner(1);
    }

    //new active player
    activePlayer = activePlayer ? 0 : 1;
}

// ***ASK*** isn't checkWinner too long and complicated?
// ***TODO*** code for checking for along function

function checkWinner() {
    let winnerX = 0;
    let winnerZero = 0;
    
    //check rows
    for (let i = 0; i < fieldSize; i++) {
        winnerX = 1;
        winnerZero = 1;
        
        for (let j = 1; j < fieldSize; j++ ) {
            
            if (board[i][j] === board[i][j-1] && board[i][j] === 'x') {
                winnerX++;
                winnerZero = 1;
            }

            if (board[i][j] === board[i][j-1] && board[i][j] === 'o') {
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
        }
    }

    //check columns
    for (let i = 0; i < fieldSize; i++) {
        winnerX = 1;
        winnerZero = 1;
        
        for (let j = 1; j < fieldSize; j++ ) {
            
            if (board[j][i] === board[j-1][i] && board[j][i] === 'x') {
                winnerX++;
                winnerZero = 1;
            }

            if (board[j][i] === board[j-1][i] && board[j][i] === 'o') {
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
        }
    }

    // check for both diagonal
    let nuberOfDiagonalToCheck = 2 * (fieldSize - winLenght) + 1;

    //check for left-top to right-bottom 
    let startRowForCheck = fieldSize - winLenght;
    let startColForCheck = 0;
    let steps = winLenght - 1;
    
    //check mechanic
    //each diagonal
    for (let i = 0; i < nuberOfDiagonalToCheck; i++) {
        
        let row = startRowForCheck;
        let col = startColForCheck;
        winnerX = 1;
        winnerZero = 1;

        //in each diagonal
        for (let j = 0; j < steps; j++) {
            if (board[row][col] === board[row+1][col+1] && board[row][col] === 'x') {
                winnerX++;
                winnerZero = 1;
            }

            if (board[row][col] === board[row+1][col+1] && board[row][col] === 'o') {
                winnerZero++;
                winnerX = 1;
            }

            if (winnerX === winLenght) {
                return 'x';
            }

            if (winnerZero === winLenght) {
                return 'o';
            }

            row++;
            col++;
        }

        //update start position for next diagonal
        if (startRowForCheck) {
            startRowForCheck--;
        } else {
            startColForCheck++;
        }

        if (steps < fieldSize - 1) {
            steps++;
        } else {
            steps--;
        }
    }

    //check for left-bottom to right-top
    startRowForCheck = winLenght - 1;
    startColForCheck = 0;
    steps = winLenght - 1;
    
    //check mechanic
    //each diagonal
    for (let i = 0; i < nuberOfDiagonalToCheck; i++) {
        
        row = startRowForCheck;
        col = startColForCheck;
        winnerX = 1;
        winnerZero = 1;

        console.log('row for lb to rt: ' + row);
        console.log('col for lb to rt: ' + col);

        //in each diagonal
        for (let j = 0; j < steps; j++) {
            if (board[row][col] === board[row-1][col+1] && board[row][col] === 'x') {
                winnerX++;
                winnerZero = 1;
            }

            if (board[row][col] === board[row-1][col+1] && board[row][col] === 'o') {
                winnerZero++;
                winnerX = 1;
            }

            if (winnerX === winLenght) {
                return 'x';
            }

            if (winnerZero === winLenght) {
                return 'o';
            }

            row--;
            col++;
        }

        //update start position for next diagonal
        if (startRowForCheck < fieldSize - 1) {
            startRowForCheck++;
        } else {
            startColForCheck++;
        }

        if (steps < fieldSize - 1) {
            steps++;
        } else {
            steps--;
        }
    }
}