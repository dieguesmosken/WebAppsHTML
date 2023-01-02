const canvas = document.querySelector("#canvas");
const context = canvas.getContext('2d');
const scoreSpan = document.querySelector('.scorePlayer1');
const scorePlayer2 = document.querySelector('.scorePlayer2');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
Colors = []
let score = 0;
let scoreP2 = 0;

const player1 = {
    x: 40,
    y: 165,
    w: 15,
    h: 70,
    dx: 6,
    dy: 6,
    direction: " "

}
const player2 = {
    x: 560,
    y: 165,
    w: 15,
    h: 70,
    dx: 6,
    dy: 6,
    direction: " "
}


const ball = {
    x: 305,
    y: 350,
    h: 14,
    w: 14,
    radius: 7,
    dx: 2,
    dy: 2
}



function gerarCor() {

    for (let i = 0; i < 12; i++) {
        const letras = '0123456789ABCDEF';
        let cor = '#';
        for (let j = 0; j < 6; j++) {

            cor += letras[Math.floor(Math.random() * 16)];
        }
        Colors.push(cor);
        console.log(cor);
        console.log(Colors.length);
        // document.body.style = 'background-color:' + Colors[Colors.length - 1] + ";";
    }
}
gerarCor();

function game() {
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);

//----------------ACTION--------------//

player1.direction = " ";
player2.direction = " ";

document.addEventListener('keydown', (event) => {

    // if (event.keyCode === 68) player1.direction = "right";
    // if (event.keyCode === 65) player1.direction = "left";

    // if (event.keyCode === 37) player2.direction = "left";    
    // if (event.keyCode === 39) player2.direction = "right";

    //------------area de teste---------//

    if (event.keyCode == 87) player1.direction = "up"; //up
    if (event.keyCode == 83) player1.direction = "down"; //down

    if (event.keyCode == 38) player2.direction = "up"; //up
    if (event.keyCode == 40) player2.direction = "down"; //down

})

document.addEventListener('keyup', (event) => {
    // if (event.keyCode === 65) player1.direction = "";
    // if (event.keyCode === 68) player1.direction = "";

    // if (event.keyCode === 37) player2.direction = "";
    // if (event.keyCode === 39) player2.direction = "";

    //-------------area de teste---------//

    if (event.keyCode == 87) player1.direction = ""; //up
    if (event.keyCode == 83) player1.direction = ""; //down 

    if (event.keyCode == 38) player2.direction = ""; //up
    if (event.keyCode == 40) player2.direction = ""; //down

})

function movePlayer() {
    // if (player1.direction === "left") player1.x -= player1.dx;
    // if (player1.direction === "right") player1.x += player1.dx;

    // if (player2.direction === "left") player2.x -= player2.dx;
    // if (player2.direction === "right") player2.x += player2.dx;

    // if (player1.x <= 0) player1.x = 0;
    // if (player1.x >= 600 - player1.w) player1.x = 600 - player1.w;

    // if (player2.x <= 0) player2.x = 0;
    // if (player2.x >= 600 - player2.w) player2.x = 600 - player2.w;

    //-------area de testes -----------//

    if (player1.direction === "up") player1.y -= player1.dy;
    if (player1.direction === "down") player1.y += player1.dy;

    if (player2.direction === "up") player2.y -= player2.dy;
    if (player2.direction === "down") player2.y += player2.dy;

    if (player1.y <= 0) player1.y = 0;
    if (player1.y >= 400 - player1.h) player1.y = 400 - player1.h;

    if (player2.y <= 0) player2.y = 0;
    if (player2.y >= 400 - player2.h) player2.y = 400 - player2.h;

}

function moveBall() {
    ball.x += ball.dx;
    ball.y -= ball.dy;
    if (ball.x + ball.radius >= 600 || ball.x <= ball.radius) {
        ball.dx = -ball.dx;

    }
    if (ball.y <= 0 || ball.y + ball.radius >= 400) {
        ball.dy = -ball.dy;
    }
    //---------VERIFICA COLISÃO COM  OS PLAYERS---------//
    //Verifica se a bola está colidindo com o barra do player 1
    if (
        (ball.x + ball.radius >= player1.x &&
            ball.x - ball.radius <= player1.x + player1.w &&
            ball.y >= player1.y &&
            ball.y - ball.radius <= player1.y + player1.h) ||
        (ball.x + ball.radius >= player2.x &&
            ball.x - ball.radius <= player2.x + player2.w &&
            ball.y >= player2.y &&
            ball.y - ball.radius <= player2.y + player2.h)
    ) {
        console.log("a verificao do player funcionou");
        ball.dx = -ball.dx;
        // 
    }
    //Verifica se a bola está colidindo com o barra do player 2
    // else if (ball.x >= player2.x &&
    //     ball.x <= player2.x + player2.w &&
    //     ball.y >= player2.y &&
    //     ball.y <= player2.y + player2.h) {
    //     console.log("a verificao do player 2 funcionou");
    //     scoreSpan.innerHTML = "funcionou 2";
    //     ball.dx = -ball.dx;
    // }



    // if ((
    //         ball.x <= player1.x + player1.w &&
    //         ball.y >= player1.y &&
    //         ball.y + ball.radius <= player1.y + player1.h
    //     )) {
    //     ball.dx = -ball.dx;
    //     // ball.dy = -ball.dy;
    //     console.log("estou aq");

    // }

    // if (

    //     (
    //         ball.x >= player2.x + ball.radius &&
    //         ball.y >= player2.y &&
    //         ball.y + player2.w <= player2.y + player2.h
    //     )


    // ) {
    //     ball.dx = -ball.dx;
    //     // ball.dy = -ball.dy;
    //     console.log("estou aq 2");

    // }

}


function updateScore(player, scorePlayer) {
    player.innerHTML = "Score: 0";
    scorePlayer++;

    player.innerHTML = "Pontos: " + scorePlayer;


}

function checkLoose() {
    if (ball.x + ball.radius >= 600) {
        updateScore(scoreSpan, score);
        score++;


    }
    if (ball.x - ball.radius <= 0) {
        updateScore(scorePlayer2, scoreP2);
        scoreP2++;
    }



}

function checkWin() {

}

function update() {
    movePlayer();
    moveBall();
    checkLoose();
    checkWin();
}

//-----------------------------RENDER------------------/



function renderPlayer(player) {



    context.beginPath();

    context.rect(player.x, player.y, player.w, player.h);
    context.fillStyle = Colors[score];
    context.fill();

    context.closePath();

}

function renderBall() {
    context.beginPath();

    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    context.fillStyle = Colors[score];
    context.fill();

    context.closePath();

}

function renderScore() {

}

function renderTest(xTest, yTest, wTest, hTest, color) {
    context.beginPath();

    context.rect(
        xTest, yTest, wTest, hTest);
    context.fillStyle = color;
    context.fill();

    context.closePath();

}

function drawScore(local, dx, scorePlayer) {

    context.font = "150px Retro Land Mayhem";
    context.fillStyle = Colors[scorePlayer];
    context.fillText(
        "" + scorePlayer,
        canvas.width / 4 - dx,
        250, 400
    );

    renderTest((canvas.width / 2) - ball.radius, 0, ball.radius + 1, canvas.height, Colors[score]);
    renderTest((canvas.width / 2) + ball.radius, 0, -ball.radius, canvas.height, Colors[scoreP2]);

}

function drawTestLines() {

    renderTest(ball.x + ball.w, ball.y - ball.h, 3, 3 + ball.h * 2, "black");

    renderTest(ball.x + ball.radius, ball.y - ball.radius, 3, ball.radius * 2, "black");
    renderTest(ball.x - ball.w, ball.y + ball.radius, ball.radius * 2, 3, "red");

    renderTest(ball.x - ball.w, ball.y - ball.h, 3, 3 + ball.h * 2, "blue");
    renderTest(ball.x - ball.w, ball.y - ball.h, 3 + ball.h * 2, 3, "green");
    renderTest(ball.x - ball.w, ball.y + ball.h, 3 + ball.h * 2, 3, "red");



    //renderTest(canvas.width / 2, 0, ball.radius, canvas.height, Colors[score]);




    //renderTest(xTest,yTest,wTest,hTest);

    // AREA INSTAVEL
    //renderTest(ball.x + ball.radius, ball.y + ball.h, ball.y + player2.w, 3, "red");
    // ball.x >= player2.x + ball.radius &&
    // ball.y >= player2.y &&
    // ball.y + player2.w <= player2.y + player2.h
}




function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawScore(player1, -(canvas.width / 4) - 50, score);
    drawScore(player2, 0, scoreP2);
    renderPlayer(player1);
    renderPlayer(player2);
    renderBall();
    //drawTestLines();






}

function trocaCor() {
    document.body.style = 'background-color:' + Colors[score] + ";";

}
setInterval(trocaCor, 5000);
//setInterval(trocaCor, 5000);