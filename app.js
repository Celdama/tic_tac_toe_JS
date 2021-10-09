const moduleGameBoard = (() => {
  const gameBoard = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];

  const showGameBoard = () => gameBoard;

  return {
    showGameBoard,
  };
})();

console.log(moduleGameBoard.showGameBoard());
