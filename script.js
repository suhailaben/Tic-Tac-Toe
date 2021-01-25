const gameBoard = (() => {
        let data = [];
        for (let i = 0; i < 9 ; i++) {
            data.push(0);
        }
    const playerMaker = (name, image) => {
    return { name, image };
    };
    const playerOne = playerMaker('Player 1', 'bunZero');
    const playerTwo = playerMaker('Player 2', 'bunTwo');
    const computerPlayer = playerMaker('Computer', 'bunThree');
    const Totoro = playerMaker('Totoro', 'Totoro');

    let squares = document.querySelectorAll('section');
    squares.forEach(square => square.addEventListener('click', () => play(square)));
    let turn = true;
    let won = false;
    
    return { data, playerOne, playerTwo, computerPlayer, Totoro, turn, won };
})();

function render() {
    for (let i = 0 ; i < gameBoard.data.length ; i++) {
        if (gameBoard.data[i] === 0) {
            let targ = document.querySelector(`[data-index="${i}"`);
            targ.removeAttribute('class');
        } else if (gameBoard.data[i] === 1) {
            let targ = document.querySelector(`[data-index="${i}"`);
            targ.setAttribute('class', gameBoard.playerOne.image);
        } else if (gameBoard.data[i] === 2) {
            let targ = document.querySelector(`[data-index="${i}"`);
            targ.setAttribute('class', gameBoard.playerTwo.image);
        }
    }
    const A = gameBoard.data
    let announcement = document.querySelector('h2');
    if ((A[0] === 1 && A[1] === 1 && A[2] === 1) || (A[3] === 1 && A[4] === 1 && A[5] === 1) || (A[6] === 1 && A[7] === 1 && A[8] === 1) || (A[0] === 1 && A[3] === 1 && A[6] === 1) || (A[1] === 1 && A[4] === 1 && A[7] === 1) || (A[2] === 1 && A[5] === 1 && A[8] === 1) || (A[0] === 1 && A[4] === 1 && A[8] === 1) || (A[2] === 1 && A[4] === 1 && A[6] === 1)) {
        announcement.textContent = `${gameBoard.playerOne.name} wins!`;
        gameBoard.won = true;
    } else if ((A[0] === 2 && A[1] === 2 && A[2] === 2) || (A[3] === 2 && A[4] === 2 && A[5] === 2) || (A[6] === 2 && A[7] === 2 && A[8] === 2) || (A[0] === 2 && A[3] === 2 && A[6] === 2) || (A[1] === 2 && A[4] === 2 && A[7] === 2) || (A[2] === 2 && A[5] === 2 && A[8] === 2) || (A[0] === 2 && A[4] === 2 && A[8] === 2) || (A[2] === 2 && A[4] === 2 && A[6] === 2)) {
        announcement.textContent = `${gameBoard.playerTwo.name} wins!`;
        gameBoard.won = true;
    } else if (!A.includes(0)) {
        announcement.textContent = 'A tie!';
    }
}

function play(element) {
    let move = element.getAttribute('data-index');
    if (gameBoard.data[move] === 0 && gameBoard.won === false) {
        if (gameBoard.turn) {
            gameBoard.data[move] = 1
        } else {
            gameBoard.data[move] = 2
        }
        render();
        gameBoard.turn ? gameBoard.turn = false : gameBoard.turn = true;
    }
}

const Menu = (() => {
    let theButton = document.querySelector('#openMenu');
    let hide = true;
    let menu = document.querySelector('#menu');
    function toggleMenu() {
        if (hide) {
            menu.style.display = 'grid';
            hide = false;
        } else {
            menu.style.display = 'none';
            hide = true;
        }
    }
    theButton.addEventListener('click', toggleMenu)
    let resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', reset)
    function reset() {
        gameBoard.data = [];
        for (let i = 0; i < 9 ; i++) {
            gameBoard.data.push(0);
        }
        gameBoard.won = false;
        gameBoard.turn = true;
        render();
    }
    let nameOne = document.querySelector('#nameone')
    nameOne.addEventListener('click', () => rename('playerOne'))
    let nameTwo = document.querySelector('#nametwo')
    nameTwo.addEventListener('click', () => rename('playerTwo'))
    function rename(whomever) {
        gameBoard[whomever]['name'] = prompt('What name would you like?', 'X')
    }
})()