const cell = document.querySelectorAll('.cell');
const player1ScoreSpan = document.querySelector('.player1Score');
const player2ScoreSpan = document.querySelector('.player2Score');
const restartBtn = document.querySelector('.restart');
const rstScore = document.querySelector('.rstScore');


//------------CONSTANTES DO BODY -----------------//
const nightmode = document.querySelector('.nightmode');
const container = document.querySelector('.container');
const body = document.querySelector('.body');
const btn = document.querySelector('.btn');
const btn2 = document.querySelector('.btn2');
const mode = document.getElementById('mode_icon');

mode.addEventListener('click', () => {
    const form = document.getElementById('container');;

    if (mode.classList.contains('fa-moon')) {
        mode.classList.remove('fa-moon');
        mode.classList.add('fa-sun');
        console.log("nightModeON");
        form.classList.add('dark');
        btn.classList.add('dark');
        btn2.classList.add('dark');
        nightmode.classList.add('dark');

        return;
    }

    mode.classList.remove('fa-sun');
    mode.classList.add('fa-moon');
    console.log("nightModeOFF");
    form.classList.remove('dark');
    btn.classList.remove('dark');
    btn2.classList.remove('dark');
    nightmode.classList.remove('dark');




});

let nightModeOn = true;
console.log(nightModeOn);
nightMode();

function nightMode() {
    if (!nightModeOn) {

        nightModeOn = true;
    } else {


        nightModeOn = false;
    }

}

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


let Colors = [];
// let ColorsBG = ["#007e47", "#0e224b", "#001b3b"];
//background: linear-gradient(#007e47, #0e224b, #001b3b);

function gerarCor() {
    for (let i = 0; i < cell.length; i++) {

        const letras = '0123456789ABCDEF';
        let cor = '#';
        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)];
        }
        Colors.push(cor);
        console.log(cor);
        console.log("CorBG: " + Colors.length);
        container.style = 'background-color:' + Colors[Colors.length - 1] + ");";


    }

}
gerarCor();
//setInterval(gerarCor, 1000);


function addCellsPlayer1(i) {
    cell[i].innerHTML = 'X';
    cell[i].fillStyle = Colors[i];
    player1.push(i);
    console.log(i);
    flag = false;

}

function addCellsPlayer2(i) {
    cell[i].innerHTML = 'O';
    cell[i].fillStyle = Colors[i];
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

});



restartBtn.addEventListener('click', () => {
    restart();
});