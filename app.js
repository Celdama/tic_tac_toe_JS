const Gameboard = (() => {
  const gameboardArray = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];

  const showGameboard = () => gameboardArray;

  return {
    showGameboard,
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
