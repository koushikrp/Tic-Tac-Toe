//Board module
gameBoard = (function (doc) {
	let board = ["", "", "", "", "", "", "", "", ""];
	getBoard = () => {
		return board;
	};
	resetBoard = () => {
		// board.splice(0, board.length);
		for (let i = 0; i < 9; i++) board[i] = "";
	};
	changeBoardItem = (index, value) => {
		board[index] = value;
	};
	allFilled = () => {
		for (let i = 0; i < 9; i++) if (board[i] === "") return false;
		return true;
	};
	evaluate = () => {
		for (let i = 0; i < 9; i += 3) {
			if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
				if (board[i] === "O") return 10;
				if (board[i] === "X") return -10;
			}
		}
		for (let i = 0; i < 3; i++) {
			if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
				if (board[i] === "O") return 10;
				if (board[i] === "X") return -10;
			}
		}
		if ((board[0] === board[4] && board[4] === board[8]) || (board[2] === board[4] && board[4] === board[6])) {
			if (board[4] === "O") return 10;
			if (board[4] === "X") return -10;
		}
		return 0;
	};
	miniMax = (isMaximum) => {
		let stateStatus = evaluate();
		if (stateStatus === 10 || stateStatus === -10) return stateStatus;
		if (allFilled()) return 0;
		let bestValue;
		if (isMaximum) {
			bestValue = -1e4;
			for (let i = 0; i < 9; i++) {
				if (board[i] === "") {
					board[i] = "O";
					bestValue = Math.max(bestValue, miniMax(false));
					board[i] = "";
				}
			}
		} else {
			bestValue = 1e4;
			for (let i = 0; i < 9; i++) {
				if (board[i] === "") {
					board[i] = "X";
					bestValue = Math.min(bestValue, miniMax(true));
					board[i] = "";
				}
			}
		}
		return bestValue;
	};
	findBestMove = () => {
		let bestPoints = -1e4;
		let bestMove, curPoints;
		for (let i = 0; i < 9; i++) {
			if (board[i] === "") {
				board[i] = "O";
				curPoints = miniMax(false);
				board[i] = "";
				if (curPoints > bestPoints) {
					bestPoints = curPoints;
					bestMove = i;
				}
			}
		}
		return bestMove;
	};
	return {
		getBoard,
		resetBoard,
		changeBoardItem,
		allFilled,
		findBestMove,
		evaluate,
	};
})(document);

//Display module
displayController = (function (doc) {
	render = () => {
		let curBoard = gameBoard.getBoard();
		let itr = 0;
		curBoard.forEach((element) => {
			doc.querySelector(`.pos${itr + 1}`).textContent = element;
			itr++;
		});
	};
	return {
		render,
	};
})(document);

//Player factory function
player = () => {
	const setName = (name) => {
		this.name = name;
	};
	const getName = () => {
		return this.name;
	};
	const setSymbol = (symbol) => {
		this.symbol = symbol;
	};
	const getSymbol = () => {
		return this.symbol;
	};
	play = () => {
		document.querySelector(".submitName").addEventListener("click", (e) => {
			let enteredName = document.querySelector(".name").value;
			document.querySelector(".name").value = "";
			player1.setName(enteredName);
			document.getElementById("playerturn").textContent = enteredName + " Turn";
		});

		document.querySelector(".start").addEventListener("click", () => {
			document.querySelector(".results").textContent = "";
			gameBoard.resetBoard();
			displayController.render();
		});

		markers = document.getElementsByClassName("element");
		[...markers].forEach((marker) => {
			marker.addEventListener("click", (e) => {
				const announceResults = document.querySelector(".results");
				document.querySelector(".results").textContent = "";
				if (e.target.textContent !== "") return;
				gameBoard.changeBoardItem(e.target.classList[1][3] - 1, player1.getSymbol());
				displayController.render();

				if (gameBoard.evaluate() === 10 || gameBoard.evaluate() === -10) {
					announceResults.innerText = "GAME OVER: " + `${player1.getName()}` + " WON!";
					gameBoard.resetBoard();
					render();
				} else if (gameBoard.allFilled()) {
					announceResults.innerText = "GAME OVER: " + "It's a DRAW.";
					gameBoard.resetBoard();
					render();
				} else {
					document.getElementById("playerturn").style.backgroundColor = "transparent";
					document.getElementById("aiturn").style.backgroundColor = "rgb(163, 66, 87)";
					// while (gameBoard.getBoard()[(r = ~~(Math.random() * 9))] !== "");
					let r = gameBoard.findBestMove();
					gameBoard.changeBoardItem(r, "O");
					displayController.render();
					if (gameBoard.evaluate() === 10 || gameBoard.evaluate() === -10) {
						announceResults.innerText = "GAME OVER: AI WON!";
						gameBoard.resetBoard();
						render();
					} else if (gameBoard.allFilled()) {
						announceResults.innerText = "GAME OVER: " + "It's a DRAW.";
						gameBoard.resetBoard();
						render();
					}
					setTimeout(() => {
						document.getElementById("playerturn").style.backgroundColor = "rgb(163, 66, 87)";
						document.getElementById("aiturn").style.backgroundColor = "transparent";
					}, 100);
				}
			});
		});
	};
	return {
		setName,
		getName,
		setSymbol,
		getSymbol,
		play,
	};
};

player1 = player();
player1.setSymbol("X");
player1.play();
