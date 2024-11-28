let currentPlayer = 1;
let players = [0, 0, 0, 0]; // Posisi pemain (4 pemain)
const boardSize = 100; // 10x10 papan
const diceButton = document.getElementById("rollDice");
const currentPlayerElem = document.getElementById("currentPlayer");
const statusMessage = document.getElementById("statusMessage");

// Aturan ular dan tangga
const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

// Membuat papan permainan
const board = document.getElementById("board");
for (let i = 0; i < boardSize; i++) {
    const square = document.createElement("div");
    square.innerText = i + 1;
    board.appendChild(square);
}

// Roll Dice
diceButton.addEventListener("click", function () {
    const dice = Math.floor(Math.random() * 6) + 1;
    statusMessage.innerText = "Pemain " + currentPlayer + " menggulung dadu: " + dice;
    movePlayer(currentPlayer - 1, dice);
    checkForWinner();
    currentPlayer = currentPlayer === 4 ? 1 : currentPlayer + 1;
    currentPlayerElem.innerText = currentPlayer;
});

// Move Player
function movePlayer(playerIndex, dice) {
    players[playerIndex] += dice;
    if (players[playerIndex] > 100) {
        players[playerIndex] = 100;
    }
    // Posisikan pemain pada papan
    updateBoard();
}

// Update Papan
function updateBoard() {
    const squares = board.querySelectorAll("div");
    squares.forEach((square, index) => {
        square.innerHTML = "";
    });

    players.forEach((position, index) => {
        if (position > 0) {
            const square = squares[position - 1];
            const playerDiv = document.createElement("div");
            playerDiv.innerText = "P" + (index + 1);
            playerDiv.classList.add("player");
            square.appendChild(playerDiv);
        }
    });
}

// Check Winner
function checkForWinner() {
    const winner = players.findIndex((position) => position === 100);
    if (winner !== -1) {
        statusMessage.innerText = "Pemain " + (winner + 1) + " MENANG!";
        diceButton.disabled = true;
    }
}
