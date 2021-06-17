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
	return {
		getBoard,
		resetBoard,
		changeBoardItem,
	};
})(document);

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
	return {
		setName,
		getName,
		setSymbol,
		getSymbol,
	};
};

displayController = (function (doc) {
	render = () => {
		let curBoard = gameBoard.getBoard();
		let itr = 0;
		curBoard.forEach((element) => {
			doc.querySelector(`.pos${itr + 1}`).textContent = element;
			itr++;
		});
	};
	isGameOver = (boardStatus, curPlayerSymbol, curPlayerName) => {
		const announceResults = doc.querySelector(".results");
		if (
			(boardStatus[0] === curPlayerSymbol &&
				boardStatus[1] === curPlayerSymbol &&
				boardStatus[2] === curPlayerSymbol) ||
			(boardStatus[0] === curPlayerSymbol &&
				boardStatus[4] === curPlayerSymbol &&
				boardStatus[8] === curPlayerSymbol) ||
			(boardStatus[0] === curPlayerSymbol &&
				boardStatus[3] === curPlayerSymbol &&
				boardStatus[6] === curPlayerSymbol) ||
			(boardStatus[1] === curPlayerSymbol &&
				boardStatus[4] === curPlayerSymbol &&
				boardStatus[7] === curPlayerSymbol) ||
			(boardStatus[2] === curPlayerSymbol &&
				boardStatus[5] === curPlayerSymbol &&
				boardStatus[8] === curPlayerSymbol) ||
			(boardStatus[3] === curPlayerSymbol &&
				boardStatus[4] === curPlayerSymbol &&
				boardStatus[5] === curPlayerSymbol) ||
			(boardStatus[6] === curPlayerSymbol &&
				boardStatus[7] === curPlayerSymbol &&
				boardStatus[8] === curPlayerSymbol) ||
			(boardStatus[2] === curPlayerSymbol &&
				boardStatus[4] === curPlayerSymbol &&
				boardStatus[6] === curPlayerSymbol)
		) {
			announceResults.innerText = "GAME OVER: " + `${curPlayerName}` + " WON!";
			gameBoard.resetBoard();
			render();
			return true;
		}
		if (
			boardStatus[0] !== "" &&
			boardStatus[1] !== "" &&
			boardStatus[2] !== "" &&
			boardStatus[3] !== "" &&
			boardStatus[4] !== "" &&
			boardStatus[5] !== "" &&
			boardStatus[6] !== "" &&
			boardStatus[7] !== "" &&
			boardStatus[8] !== ""
		) {
			announceResults.innerText = "GAME OVER: " + "It's a DRAW.";
			gameBoard.resetBoard();
			render();
			return true;
		}
		return false;
	};
	doc.querySelector(".start").addEventListener("click", () => {
		doc.querySelector(".results").textContent = "";
		gameBoard.resetBoard();
		render();
	});
	markers = doc.getElementsByClassName("element");
	[...markers].forEach((marker) => {
		marker.addEventListener("click", (e) => {
			doc.querySelector(".results").textContent = "";
			if (e.target.textContent !== "") return;
			gameBoard.changeBoardItem(e.target.classList[1][3] - 1, player1.getSymbol());
			render();
			let currentBoard = gameBoard.getBoard();
			if (!isGameOver(currentBoard, player1.getSymbol(), player1.getName())) {
				let r;
				doc.getElementById("playerturn").style.backgroundColor = "transparent";
				doc.getElementById("aiturn").style.backgroundColor = "rgb(163, 66, 87)";
				while (currentBoard[(r = ~~(Math.random() * 9))] !== "");
				gameBoard.changeBoardItem(r, "O");
				render();
				isGameOver(gameBoard.getBoard(), "O", "AI");
				setTimeout(() => {
					doc.getElementById("playerturn").style.backgroundColor = "rgb(163, 66, 87)";
					doc.getElementById("aiturn").style.backgroundColor = "transparent";
				}, 100);
			}
		});
	});
	return {
		render,
	};
})(document);

displayController.render();
player1 = player();
player1.setSymbol("X");
document.querySelector(".submitName").addEventListener("click", (e) => {
	let enteredName = document.querySelector(".name").value;
	document.querySelector(".name").value = "";
	player1.setName(enteredName);
	document.getElementById("playerturn").textContent = enteredName + " Turn";
});
