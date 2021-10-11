const gameboardItem = document.querySelectorAll('.grid-item');
const displayResultPara = document.querySelector('.display-result');
const resetGameBtn = document.querySelector('.reset-game-btn');

const Gameboard = (() => {
  const gameboardArray = [
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
    gameboardArray.splice(0, gameboardArray.length);
    for (let i = 0; i < 9; i++) {
      gameboardArray.push('');
    }
    renderGameboard();

    gameboardItem.forEach((item) => {
      if (item.classList.contains('red')) {
        item.classList.toggle('red');
        item.classList.toggle('blue');
      }

      if (item.classList.contains('disabled-click')) {
        item.classList.toggle('disabled-click');
      }
    });
  };

  return {
    gameboardArray,
    showGameboard,
    renderGameboard,
    resetGameboard,
  };
})();

const factoryPlayers = (status, mark) => ({
  status,
  mark,
});

const displayController = (() => {
  const player1 = factoryPlayers('player1', 'X');
  const player2 = factoryPlayers('player2', 'O');

  let currentPlayer = null;

  const definePlayer = (player) => {
    currentPlayer = player.status;
  };

  const disableClickable = (items) => {
    items.forEach((item) => {
      item.classList.add('disabled-click');
    });
  };

  const initGame = () => {
    definePlayer(player1);
    gameboardItem.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (!item.textContent) {
          displayController.saveMarkInGameBoardArray(Gameboard.gameboardArray, index);
          const { winningSlot } = displayController.checkIfGameIsOver(Gameboard.gameboardArray);
          const { notEmptySlot } = displayController.checkIfGameIsOver(Gameboard.gameboardArray);
          if (Object.entries(winningSlot).length !== 0) {
            displayController.displayWinner(winningSlot, gameboardItem);
            disableClickable(gameboardItem);
          } else if (notEmptySlot) {
            displayController.displayTieGame();
          }
        }
        Gameboard.renderGameboard();
      });
    });
  };

  const resetGame = () => {
    Gameboard.resetGameboard();
    initGame();
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

  const displayWinner = (slot, gameboard) => {
    const keys = Object.keys(slot);
    const winningPlayer = currentPlayer === 'player2' ? player1 : player2;

    keys.forEach((key) => {
      // selectionne les éléments du dom corressponant aux slot gagnant
      const winningSlot = gameboard[slot[key]];
      winningSlot.classList.toggle('blue');
      winningSlot.classList.toggle('red');
    });

    displayResultPara.textContent = `The winner is ${winningPlayer.status}`;
  };

  const displayTieGame = () => {
    displayResultPara.textContent = 'Tie Game, play again !';
  };

  return {
    initGame,
    saveMarkInGameBoardArray,
    checkIfGameIsOver,
    displayWinner,
    displayTieGame,
    resetGame,
  };
})();

window.onload = displayController.initGame();

resetGameBtn.addEventListener('click', () => {
  displayController.resetGame();
});
