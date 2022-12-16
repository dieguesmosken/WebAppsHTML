const cell = document.querySelectorAll('.cell');
const player1ScoreSpan = document.querySelector('.player1Score');
const player2ScoreSpan = document.querySelector('.player2Score');
const restartBtn = document.querySelector('.restart');
const rstScore = document.querySelector('.rstScore');

console.log(cell);
console.log(player1ScoreSpan);
console.log(player2ScoreSpan);
console.log(restartBtn);
console.log(rstScore);

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let player1 = [];
let player2 = [];

let score = {
    player1: 0,
    player2: 0
};

let flag = true;

for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', () => {
        if (flag === true) {
            addCellsPlayer1(i);
        } else {
            addCellsPlayer2(i);
        }
        checkWinner();

    });
}

function addCellsPlayer1(i) {
    cell[i].innerHTML = 'X';
    player1.push(i);
    flag = false;
}

function addCellsPlayer2(i) {
    cell[i].innerHTML = 'O';
    player2.push(i);
    flag = true;
}

// function checkWinner() {
//     for (let i = 0; i < winCombinations.length; i++) {
//         if (winCombinations[i].every((val) => player1.includes(val))) {
//             console.log('Player 1 won');
//             score.player1++;
//             player1Score.innerHTML = score.player1;
//             restart();
//         } else if (winCombinations[i].every((val) => player2.includes(val))) {
//             console.log('Player 2 won');
//             score.player2++;
//             player2Score.innerHTML = score.player2;
//             restart();
//         }
//     }
// }

function checkWinner() {
    winCombinations.find((item) => {
        if (item.filter((i) => player1.includes(i)).length === 3) {
            console.log('Player 1 won');
            alert('Jogador 1 venceu');
            score.player1++;
            drawScore();
            restart();
            return item;



        } else if (item.filter((i) => player2.includes(i)).length === 3) {
            console.log('Player 2 won');
            alert('Jogador 2 venceu');
            score.player2++;
            drawScore();
            restart();

        }
        return
    });
}

function drawScore() {
    player1ScoreSpan.innerHTML = "Jogador 1: " + score.player1;
    player2ScoreSpan.innerHTML = "Jogador 2: " + score.player2;
}
drawScore();

function restart() {

    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    player1 = [];
    player2 = [];
    flag = true;
}


rstScore.addEventListener('click', () => {
    score.player1 = 0;
    score.player2 = 0;
    drawScore();
    restart();

}
);



restartBtn.addEventListener('click', () => {
    restart();
}
);


