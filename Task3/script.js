const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

// Winning combinations
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // cols
  [0,4,8], [2,4,6]            // diagonals
];

// Initialize game
cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetGame);

function cellClicked() {
  const index = this.getAttribute("data-index");

  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    running = false;
  } else {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ""));
}
