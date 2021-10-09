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

player1.showName();
player2.showName();
