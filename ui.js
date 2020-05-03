window.addEventListener('load', startGame);

let boardEl = document.getElementById('board');
let modalEl = document.getElementById('modal');
let resetButtons = document.getElementsByClassName('reset');

for (let btn of resetButtons) {
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
    }
    startGame();
  });
}

boardEl.addEventListener('click', function (event) {
  let targetClasses = event.target.classList;
  let targetData = event.target.dataset;
  if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
    click(targetData.row, targetData.col);
  }
});

function showWinner(winner) {
  let header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `🍾 Победил игрок №${winner + 1}! 🍾`;
  modalEl.classList.remove('hidden');
}

function renderBoard(board) {
  const fields = [];

  let symbolsize = Math.floor(0.8 * (450 - board.length - 1) / board.length);
  
  const symbolX = `<svg class="symbol-x" height="${symbolsize}" width="${symbolsize}">
      <line class="symbol-x__line line-1" x1="20%" y1="20%" x2="80%" y2="80%"></line>
      <line class="symbol-x__line line-2" x1="20%" y1="80%" x2="80%" y2="20%"></line>
      </svg>`;
  
  const symbolO = `<svg class="symbol-o" height="${symbolsize}" width="${symbolsize}">
      <circle class="symbol-o_circle" r="33%" cx="50%" cy="50%"></circle>
      </svg>`;

  let borderRadius = "14px";

  if (board.length > 10) {
    boardEl.style.gridGap = "3px";
    borderRadius = "0";
  } else if (board.length > 7) {
    boardEl.style.gridGap = "3px";
    borderRadius = "3px";

  } else if (board.length > 5) {
    boardEl.style.gridGap = "5px";
    borderRadius = "8px";

  } else {
    boardEl.style.gridGap = "10px";
    borderRadius = "14px";
  }

  for (let [i, row] of board.entries()) {
    for (let [j, value] of row.entries()) {
      let symbolForCell = '';

      if (value === 'x') {
        symbolForCell = symbolX;
      } else if (value === 'o') {
        symbolForCell = symbolO;
      }

      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-row="${i}" 
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};border-radius:${borderRadius};"
        >
        ${symbolForCell}
        </div>
      `); //  ${value || ''} or ${symbolForCell}
    }
  }
  boardEl.innerHTML = fields.join('');
}