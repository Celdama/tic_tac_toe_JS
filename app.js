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

const factoryPlayers = (name, mark) => {
  // sign is X or O
  const playerName = name;
  const playerMark = mark;

  const showName = () => {
    console.log(playerName);
  };

  return {
    showName,
    playerName,
    playerMark,
  };
};

const displayController = (() => {
  let currentPlayer = 'p1';

  const showController = () => console.log('controller');

  const initGame = () => {
    console.log('init Game');
    Gameboard.renderGameboard();
  };

  const addMarkToGameboard = (array, index, playerMark) => {
    array[index] = playerMark;
  };

  const saveMarkInGameBoardArray = (array, i) => {
    if (currentPlayer === 'p1') {
      console.log('turn on player1');
      addMarkToGameboard(array, i, 'X');
      currentPlayer = 'p2';
    } else {
      console.log('turn on player 2');
      addMarkToGameboard(array, i, '0');
      currentPlayer = 'p1';
    }
  };

  return {
    showController,
    initGame,
    saveMarkInGameBoardArray,
  };
})();

Gameboard.renderGameboard();

gameboardItem.forEach((item, index) => {
  item.addEventListener('click', () => {
    displayController.saveMarkInGameBoardArray(Gameboard.gameboardArray, index);
    console.log(index);
    Gameboard.renderGameboard();
  });
});
