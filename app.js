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

  const checkIfGameIsOver = (array) => {
    const winningSlot = {};
    // vérifie si toutes les cases sont remplis
    const notEmptySlot = array.every((slot) => slot !== '');

    if (array[0] === array[1] && array[1] === array[2]) {
      // ce if permet d'éviter le cas où les 3 cases sont === mais valent " "
      if (array[0] !== '') {
        winningSlot.a = 0;
        winningSlot.b = 1;
        winningSlot.c = 2;
      }
    }

    if (array[0] === array[3] && array[3] === array[6]) {
      if (array[0] !== '') {
        winningSlot.a = 0;
        winningSlot.b = 3;
        winningSlot.c = 6;
      }
    }

    if (array[0] === array[4] && array[4] === array[8]) {
      if (array[0] !== '') {
        winningSlot.a = 0;
        winningSlot.b = 4;
        winningSlot.c = 8;
      }
    }

    if (array[1] === array[4] && array[4] === array[7]) {
      if (array[1] !== '') {
        winningSlot.a = 1;
        winningSlot.b = 4;
        winningSlot.c = 7;
      }
    }

    if (array[2] === array[5] && array[5] === array[8]) {
      if (array[2] !== '') {
        winningSlot.a = 2;
        winningSlot.b = 5;
        winningSlot.c = 8;
      }
    }

    if (array[2] === array[4] && array[4] === array[6]) {
      if (array[2] !== '') {
        winningSlot.a = 2;
        winningSlot.b = 4;
        winningSlot.c = 6;
      }
    }

    if (array[3] === array[4] && array[4] === array[5]) {
      if (array[3] !== '') {
        winningSlot.a = 3;
        winningSlot.b = 4;
        winningSlot.c = 5;
      }
    }

    if (array[6] === array[7] && array[7] === array[8]) {
      if (array[6] !== '') {
        winningSlot.a = 6;
        winningSlot.b = 7;
        winningSlot.c = 8;
      }
    }

    return {
      winningSlot,
      notEmptySlot,
    };
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

  const displayWinner = (slot) => {
    console.log('we have a winner');
    console.log(slot);
    console.log(gameboardItem);
  };

  const displayTieGame = () => {
    console.log('its a tie game');
  };

  return {
    showController,
    initGame,
    saveMarkInGameBoardArray,
    showCurrentPlayer,
    checkIfGameIsOver,
    displayWinner,
    displayTieGame,
  };
})();

displayController.showCurrentPlayer();
Gameboard.renderGameboard();

gameboardItem.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (!item.textContent) {
      displayController.saveMarkInGameBoardArray(Gameboard.gameboardArray, index);
      const { winningSlot } = displayController.checkIfGameIsOver(Gameboard.gameboardArray);
      const tieGame = displayController.checkIfGameIsOver(Gameboard.gameboardArray).notEmptySlot;
      if (Object.entries(winningSlot).length !== 0) {
        displayController.displayWinner(winningSlot);
      } else if (tieGame) {
        displayController.displayTieGame();
      }
      Gameboard.renderGameboard();
    }
  });
});
