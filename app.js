const gameboardItem = document.querySelectorAll('.grid-item');

const Gameboard = (() => {
  let gameboardArray = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];

  const showGameboard = () => gameboardArray;

  const renderGameboard = () => {
    gameboardItem.forEach((item, i) => {
      item.textContent = gameboardArray[i];
      item.dataset.id = i;
    });
  };

  const resetGameboard = () => {
    gameboardArray = [];
    for (let i = 0; i < 9; i++) {
      gameboardArray.push('');
    }
  };

  return {
    gameboardArray,
    showGameboard,
    renderGameboard,
    resetGameboard,
  };
})();

const factoryPlayers = (status, mark) => {
  const showStatus = () => {
    console.log(status);
  };

  return {
    showStatus,
    status,
    mark,
  };
};

const displayController = (() => {
  const player1 = factoryPlayers('player1', 'X');
  const player2 = factoryPlayers('player2', 'O');

  let currentPlayer = player1.status;

  const showController = () => console.log('controller');

  const showCurrentPlayer = () => {
    console.log(player2.status);
    console.log(player1);
  };

  const initGame = () => {
    console.log('init Game');
    Gameboard.renderGameboard();
  };

  const addMarkToGameboard = (array, index, playerMark) => {
    array[index] = playerMark;
  };

  const saveMarkInGameBoardArray = (array, i) => {
    if (currentPlayer === 'player1') {
      addMarkToGameboard(array, i, player1.mark);
      currentPlayer = player2.status;
    } else {
      addMarkToGameboard(array, i, player2.mark);
      currentPlayer = player1.status;
    }
  };

  return {
    showController,
    initGame,
    saveMarkInGameBoardArray,
    showCurrentPlayer,
  };
})();

displayController.showCurrentPlayer();
Gameboard.renderGameboard();

gameboardItem.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (!item.textContent) {
      displayController.saveMarkInGameBoardArray(Gameboard.gameboardArray, index);
      Gameboard.renderGameboard();
    }
  });
});
