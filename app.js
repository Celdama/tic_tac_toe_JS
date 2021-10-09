const Gameboard = (() => {
  const gameboardItem = document.querySelectorAll('.grid-item');

  const gameboardArray = [
    'x', 'o', 'x',
    'x', 'o', 'o',
    'x', 'x', 'x',
  ];

  const showGameboard = () => gameboardArray;

  const renderGameboard = () => {
    gameboardItem.forEach((item, i) => {
      item.textContent = gameboardArray[i];
    });
  };

  return {
    showGameboard,
    renderGameboard,
  };
})();

const displayController = (() => {
  const showController = () => console.log('controller');

  return {
    showController,
  };
})();

const factoryPlayers = (name) => {
  const playerName = name;

  const showName = () => {
    console.log(playerName);
  };

  return {
    showName,
  };
};

const player1 = factoryPlayers('Hubert');
const player2 = factoryPlayers('Eliott');

displayController.showController();

player1.showName();
player2.showName();

Gameboard.renderGameboard();
