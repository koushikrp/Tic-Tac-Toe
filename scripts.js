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

displayController = (function (doc) {
	render = () => {
		let curBoard = gameBoard.getBoard();
		let itr = 0;
		curBoard.forEach((element) => {
			doc.querySelector(`.pos${itr + 1}`).textContent = element;
			itr++;
		});
	};
	isGameOver = (boardStatus) => {
		const announceResults = document.getElementById("results");

		return false;
	};
	doc.querySelector(".start").addEventListener("click", () => {
		gameBoard.resetBoard();
		render();
	});
	markers = doc.getElementsByClassName("element");
	[...markers].forEach((marker) => {
		marker.addEventListener("click", (e) => {
			if (e.target.textContent !== "") return;
			gameBoard.changeBoardItem(e.target.classList[1][3] - 1, player1.getSymbol());
			render();
			let currentBoard = gameBoard.getBoard();
			if (!isGameOver(currentBoard)) {
				let r;
				while (currentBoard[(r = ~~(Math.random() * 9))] !== "") console.log(r);
				gameBoard.changeBoardItem(r, "O");
				render();
				if (isGameOver(gameBoard.getBoard()));
			}
		});
	});
	return {
		render,
	};
})(document);

displayController.render();
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
player1 = player();
player1.setSymbol("X");
document.querySelector(".submitName").addEventListener("click", (e) => {
	let enteredName = document.querySelector(".name").value;
	document.querySelector(".name").value = "";
	player1.setName(enteredName);
	document.getElementById("playerturn").textContent = enteredName + " Turn";
});
// player2 = new player();
