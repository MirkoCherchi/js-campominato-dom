'use strict';

/*
Funzioni
*/

function creaElementi(tag, className, content) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.append(content);

  return element;
}

function selectCellNumber(level) {
  let cellNumber;
  switch (level) {
    case 2:
      cellNumber = 81;
      break;

    case 3:
      cellNumber = 49;
      break;

    case 1:
    default:
      cellNumber = 100;
      break;
  }

  return cellNumber;
}

function creaContCell(mainElement, cellNumber) {
  const cell = Math.sqrt(cellNumber)

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= cellNumber; i++) {
    const elementiCreati = creaElementi('div', 'cell', i);
    elementiCreati.classList.add(`cell-${cell}`);

    elementiCreati.addEventListener('click', function () {
      console.log(elementiCreati.innerHTML);
      elementiCreati.classList.add('click');
    });

    fragment.append(elementiCreati);
  }
  mainElement.append(fragment);
}

function contGame() {
    resetGame();
  const cont = document.querySelector('.cont-game');
  const levelSelect = document.getElementById('difficult');
  const level = parseInt(levelSelect.value);
  const cellNumber = selectCellNumber(level);

  console.log(cellNumber);

  creaContCell(cont, cellNumber);
}

function resetGame() {
  const board = document.querySelector('.cont-game');
  board.innerHTML = '';
}


/*
Gioco
*/

const inizioGioco = document.querySelector('.btn');
inizioGioco.addEventListener('click', contGame);


