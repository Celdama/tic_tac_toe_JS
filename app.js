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
    for (let i = 0; i < 9; i += 1) {
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

const factoryPlayers = (status, mark, name, isComputer) => ({
  status,
  mark,
  name,
  isComputer,
});

const displayController = (() => {
  const player1 = factoryPlayers('player1', 'X', 'Jean', false);
  // const player2 = factoryPlayers('player2', 'O', 'Computer', false);
  const player2 = factoryPlayers('computer', '0', 'Celdama', true);

  let haveAWinner = false;
  let currentPlayer = null;
  let humanVersusAi = null;

  const definePlayer = (player) => {
    currentPlayer = player.status;
  };

  const disableClickable = (items) => {
    items.forEach((item) => {
      item.classList.add('disabled-click');
    });
  };

  const removeDisableClickable = (items) => {
    items.forEach((item) => {
      item.classList.remove('disabled-click');
    });
  };

  const setPlayerOftheGame = (firstPlayer, secondPlayer) => {
    const players = [];
    players.push(firstPlayer);
    players.push(secondPlayer);
    return players;
  };

  const computerChoice = (array) => {
    // console.log(array);
    const choiceAvailable = [];
    array.forEach((item, index) => {
      if (!item) {
        // console.log(`${item}${index} is empty`);
        choiceAvailable.push(index);
      }
    });
    // console.log(choiceAvailable);

    const random = randomNumberForComputerChoice(0, choiceAvailable.length);
    return choiceAvailable[random];
  };

  const humanVersusHuman = (item, index) => {
    // console.log('its a human battle');
    humanVersusAi = false;

    if (!item.textContent) {
      displayController.saveMarkInGameBoardArray(Gameboard.gameboardArray, index, humanVersusAi);
      const { winningSlot } = displayController.checkIfGameIsOver(Gameboard.gameboardArray);
      const { notEmptySlot } = displayController.checkIfGameIsOver(Gameboard.gameboardArray);
      if (Object.entries(winningSlot).length !== 0) {
        displayController.displayWinner(winningSlot, gameboardItem, humanVersusAi);
        disableClickable(gameboardItem);
      } else if (notEmptySlot) {
        displayController.displayTieGame();
      }
    }
    Gameboard.renderGameboard();
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const humanVersusComputer = (item, index, computerTurn) => {
    console.log(computerTurn);
    humanVersusAi = true;
    // console.log('its a computer battle');
    console.log(item.textContent);
    if (!item.textContent || item.textContent === 'X') {
      if (computerTurn === false) {
        console.log('plyaer tuuuuurn');
        displayController.saveMarkInGameBoardArray(Gameboard.gameboardArray, index, humanVersusAi);
      }

      if (computerTurn === true) {
        console.log('compuuuuter turn');
        const computerIndex = computerChoice(Gameboard.gameboardArray);
        displayController
          .saveMarkInGameBoardArray(Gameboard.gameboardArray, computerIndex, humanVersusAi);
      }
      const { winningSlot } = displayController.checkIfGameIsOver(Gameboard.gameboardArray);
      const { notEmptySlot } = displayController.checkIfGameIsOver(Gameboard.gameboardArray);
      console.log(`current player is${currentPlayer}`);
      if (Object.entries(winningSlot).length !== 0) {
        displayController.displayWinner(winningSlot, gameboardItem, humanVersusAi);
        disableClickable(gameboardItem);
      } else if (notEmptySlot) {
        displayController.displayTieGame();
      }
    }
    Gameboard.renderGameboard();
  };

  const initGame = () => {
    const participant = setPlayerOftheGame(player1, player2);
    if (!participant[0].isComputer && !participant[1].isComputer) {
      definePlayer(player1);
      gameboardItem.forEach((item, index) => {
        item.addEventListener('click', () => humanVersusHuman(item, index));
      });
    } else {
      definePlayer(player1);
      gameboardItem.forEach((item, index) => {
        item.addEventListener('click', () => {
          humanVersusComputer(item, index, false);
          disableClickable(gameboardItem);
          setTimeout(() => {
            if (!haveAWinner) {
              humanVersusComputer(item, index, true);
              removeDisableClickable(gameboardItem);
            }
          }, 2000);
        });
      });
    }
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

  const randomNumberForComputerChoice = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const saveMarkInGameBoardArray = (array, i, isAiBattle) => {
    console.log(`current player is savamarkingameboard${currentPlayer}`);
    console.log(isAiBattle);
    if (currentPlayer === 'player1') {
      addMarkToGameboard(array, i, player1.mark);
      // si c'est contre l'ordi on renvoi la balle à l'ordinateur, sinon au joueur 2
      currentPlayer = isAiBattle ? 'computer' : player2.status;
    } else if (currentPlayer === 'player2') {
      addMarkToGameboard(array, i, player2.mark);
      currentPlayer = player1.status;
    } else if (currentPlayer === 'computer') {
      // console.log('its a computer choice');
      addMarkToGameboard(array, i, player2.mark);
      currentPlayer = player1.status;
    }
    console.log(`current player is savamarkingameboard at the enn${currentPlayer}`);
  };

  const displayWinner = (slot, gameboard, Ai) => {
    let winningPlayer = null;
    haveAWinner = true;

    if (Ai) {
      winningPlayer = currentPlayer === 'player1' ? player2.status : player1.status;
    } else {
      winningPlayer = currentPlayer === 'player2' ? player1.status : player2.status;
    }

    const keys = Object.keys(slot);

    keys.forEach((key) => {
      // selectionne les éléments du dom corressponant aux slot gagnant
      const winningSlot = gameboard[slot[key]];
      winningSlot.classList.toggle('blue');
      winningSlot.classList.toggle('red');
    });

    displayResultPara.textContent = `The winner is ${winningPlayer}`;
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
