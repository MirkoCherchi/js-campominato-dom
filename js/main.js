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
  switch (level) {
    case 2:
      return 81;
    case 3:
      return 49;
    case 1:
    default:
      return 100;
  }
}

function creaContCell(mainElement, cellNumber) {
  const cell = Math.sqrt(cellNumber);

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= cellNumber; i++) {
    const elementiCreati = creaElementi('div', 'cell', i);
    elementiCreati.classList.add(`cell-${cell}`);

    elementiCreati.addEventListener('click', function () {
      if (!bombeArray) {
        bombeArray = creazioneBombe(cellNumber);
      }

      if (bombeArray.includes(i)) {
        // Hai cliccato su una bomba
        elementiCreati.classList.add('bomb-clicked');
        gameOver(mainElement, bombeArray);
      } else {
        // Hai cliccato su una cella sicura
        elementiCreati.classList.add('click');
      }
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
  cellNumber = selectCellNumber(level);

  console.log(cellNumber);

  creaContCell(cont, cellNumber);
}

function resetGame() {
  const board = document.querySelector('.cont-game');
  board.innerHTML = '';
  bombeArray = null;
}

function creazioneBombe(cellNumber) {
  const bombeArray = [];
  while (bombeArray.length < 16) {
    const bomba = Math.floor(Math.random() * cellNumber) + 1;
    if (!bombeArray.includes(bomba)) {
      bombeArray.push(bomba);
    }
  }
  console.log(bombeArray);
  return bombeArray;
}

function gameOver() {
  console.log('Game Over!');
  comunicarePunteggio();
}


function comunicarePunteggio() {
  const celleCliccate = document.querySelectorAll('.click');
  console.log('Il tuo punteggio è:', celleCliccate.length);
  const punteggioFinale = document.querySelector('.punteggio');
  punteggioFinale.append('Il tuo punteggio è: ', celleCliccate.length);
  
}

/*
Gioco
*/
let cellNumber;
let bombeArray; 
const inizioGioco = document.querySelector('.btn');
inizioGioco.addEventListener('click', contGame);
