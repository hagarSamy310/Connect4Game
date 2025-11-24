// Global variables
const playerRed = "R";
const playerYellow = "Y";
const rows = 6;
const cols = 7;

let currPlayer = playerRed;
let boardRecords = []; // To track and update current player
let gameOver = false;

let colsTiles = [5, 5, 5, 5, 5, 5, 5]; // Starting from the last row

window.onload = setGame;

function setGame() {
	for (let r = 0; r < rows; r++) {
		let rowRecords = []; // To track and update current player

		for (let c = 0; c < cols; c++) {
			rowRecords.push(" ");

			let tile = document.createElement("div");
			tile.id = `${r.toString()}-${c.toString()}`;
			tile.classList.add("tile");
			document.getElementById("board").append(tile);

			tile.addEventListener("click", setPiece);
		}
		boardRecords.push(rowRecords);
	}
}

function setPiece() {
	if (gameOver) {
		return;
	}

	let col = parseInt(this.id.split("-")[1]);
	let row = colsTiles[col];

	if (row < 0) {
		return;
	}
	boardRecords[row][col] = currPlayer;
	let tile = document.getElementById(`${row}-${col}`);
	
	if (currPlayer === playerRed) {
		tile.style.backgroundColor = "red";
		currPlayer = playerYellow;
	} else {
		tile.style.backgroundColor = "yellow";
		currPlayer = playerRed;
	}

	row--;
	colsTiles[col] = row;
	checkWinner();
}

function checkWinner() {
	if (
		checkHorizontally() ||
		checkVertically() ||
		checkDiagonalUp() ||
		checkDiagonalDown()
	) {
		return;
	}
	// Draw >>
	// after checking in 4 directions...make sure there are no left empty tiles
	if (boardRecords.every((row) => row.every((cell) => cell !== " "))) {
		let winnerMsg = document.getElementById("winner-msg");
		winnerMsg.classList.remove('red-wins', 'yellow-wins');
		winnerMsg.textContent = "It's a Draw!";
		winnerMsg.classList.add('draw');
		winnerMsg.style.display = 'block';
		setTimeout(() => {
			winnerMsg.style.display = "none";
		}, 3000);
		gameOver = true;
	}
}
function checkHorizontally() {
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols - 3; c++) {
			if (boardRecords[r][c] !== " ") {
				if (
					boardRecords[r][c] === boardRecords[r][c + 1] &&
					boardRecords[r][c + 1] === boardRecords[r][c + 2] &&
					boardRecords[r][c + 2] === boardRecords[r][c + 3]
				) {
					highlightWinner([
						[r, c],
						[r, c + 1],
						[r, c + 2],
						[r, c + 3],
					]);
					return true;
				}
			}
		}
	}
	return false;
}

function checkVertically() {
	for (let r = 0; r < rows - 3; r++) {
		for (let c = 0; c < cols; c++) {
			if (boardRecords[r][c] !== " ") {
				if (
					boardRecords[r][c] === boardRecords[r + 1][c] &&
					boardRecords[r + 1][c] === boardRecords[r + 2][c] &&
					boardRecords[r + 2][c] === boardRecords[r + 3][c]
				) {
					highlightWinner([
						[r, c],
						[r + 1, c],
						[r + 2, c],
						[r + 3, c],
					]);

					return true;
				}
			}
		}
	}
	return false;
}

function checkDiagonalUp() {
	// Check diagonally ↗
	for (let r = 3; r < rows; r++) {
		for (let c = 0; c < cols - 3; c++) {
			if (boardRecords[r][c] !== " ") {
				if (
					boardRecords[r][c] === boardRecords[r - 1][c + 1] &&
					boardRecords[r - 1][c + 1] === boardRecords[r - 2][c + 2] &&
					boardRecords[r - 2][c + 2] === boardRecords[r - 3][c + 3]
				) {
					highlightWinner([
						[r, c],
						[r - 1, c + 1],
						[r - 2, c + 2],
						[r - 3, c + 3],
					]);

					return true;
				}
			}
		}
	}
	return false;
}

function checkDiagonalDown() {
	// Check anti-diagonally ↘
	for (let r = 0; r < rows - 3; r++) {
		for (let c = 0; c < cols - 3; c++) {
			if (boardRecords[r][c] !== " ") {
				if (
					boardRecords[r][c] === boardRecords[r + 1][c + 1] &&
					boardRecords[r + 1][c + 1] === boardRecords[r + 2][c + 2] &&
					boardRecords[r + 2][c + 2] === boardRecords[r + 3][c + 3]
				) {
					highlightWinner([
						[r, c],
						[r + 1, c + 1],
						[r + 2, c + 2],
						[r + 3, c + 3],
					]);

					return true;
				}
			}
		}
	}
	return false;
}
function highlightWinner(coords) {
	coords.forEach(([r, c]) => {
		let tile = document.getElementById(`${r}-${c}`);
		tile.classList.add('winning');
	});

	setWinner(coords[0][0], coords[0][1]);
}

function setWinner(r, c) {

	let winnerMsg = document.getElementById("winner-msg");
	winnerMsg.classList.remove("red-wins", "yellow-wins");

	if (boardRecords[r][c] === playerRed) {
		winnerMsg.textContent = "Red Wins!";
		winnerMsg.classList.add("red-wins");
		winnerMsg.style.display = "block";
		setTimeout(() => {
			winnerMsg.style.display = "none";
		}, 3000);
		gameOver = true;
	} else {
		winnerMsg.textContent = "Yellow Wins!";
		winnerMsg.classList.add("yellow-wins");
		winnerMsg.style.display = "block";
		setTimeout(() => {
			winnerMsg.style.display = "none";
		
		}, 3000);

		gameOver = true;
	}
}

function resetGame() {
	document.getElementById("board").innerHTML = "";
	currPlayer = playerRed;
	boardRecords = []; 
	gameOver = false;
	colsTiles = [5, 5, 5, 5, 5, 5, 5]; 
	setGame();
}

const reset = document.getElementById('reset');
reset.addEventListener('click', resetGame);
