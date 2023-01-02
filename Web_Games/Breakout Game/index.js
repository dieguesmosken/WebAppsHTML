const canvas = document.querySelector("#canvas");
const context = canvas.getContext('2d');
const scoreSpan = document.querySelector('#scoreSpan');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
Colors = []
let score = 0;

const player = {
    x: 270,
    y: 360,
    w: 70,
    h: 15,
    dx: 6
}

const ball = {
    x: 305,
    y: 350,
    radius: 7,
    dx: 4,
    dy: 4
}

const bricks = {
    rows: 7,
    cols: 4
}

const brick = {
    w: 60,
    h: 20,
    padding: 15,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

let brickLength = bricks.rows * bricks.cols;
let totalBricks = bricks.rows * bricks.cols;


console.log(brickLength);
const bricksArr = [];

function gerarCor() {

    for (let i = 0; i < totalBricks; i++) {
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

for (let i = 0; i < bricks.rows; i++) {
    bricksArr[i] = [];

    for (let j = 0; j < bricks.cols; j++) {
        const x = i * (brick.w + brick.padding) + brick.offsetX;
        const y = j * (brick.h + brick.padding) + brick.offsetY;

        bricksArr[i][j] = {
            x,
            y,
            ...brick,
        }

    }
}

function game() {
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);

//----------------ACTION--------------//

let playerDirection = " ";

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 37 || event.keyCode === 65) playerDirection = "left";
    //if (event.keyCode == 38 || ) direction = "up";
    if (event.keyCode === 39 || event.keyCode === 68) playerDirection = "right";
    //if (event.keyCode == 40 && direction != "up") direction = "down";

})

document.addEventListener('keyup', (event) => {
    if (event.keyCode === 37 || event.keyCode === 65) playerDirection = "";
    //if (event.keyCode == 38 || ) direction = "up";
    if (event.keyCode === 39 || event.keyCode === 68) playerDirection = "";
    //if (event.keyCode == 40 && direction != "up") direction = "down";

})

function movePlayer() {
    if (playerDirection === "left") player.x -= player.dx;
    if (playerDirection === "right") player.x += player.dx;

    if (player.x <= 0) player.x = 0;
    if (player.x >= 600 - player.w) player.x = 600 - player.w;

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
    if (ball.x + ball.radius > player.x &&
        ball.x <= player.x + player.w &&
        ball.y + ball.radius >= player.y) {
        ball.dy = -ball.dy;
    }
    bricksArr.forEach((col) => {
        col.forEach((brick => {
            if (brick.visible === true) {
                checkBricksCollision(brick);

            }
        }));
    });
}

function checkBricksCollision(brick) {
    if (ball.x >= brick.x &&
        ball.x + ball.radius <= brick.x + brick.w &&
        ball.y + ball.radius >= brick.y &&
        ball.y <= brick.y + brick.h) {
        // console.log("colidiu");
        ball.dy = -ball.dy;
        brick.visible = false;
        brickLength--;
        console.log(brickLength);
        updateScore();
    }
}

function updateScore() {
    scoreSpan.innerHTML = " ";
    score++;
    scoreSpan.innerHTML = score;
}

function checkLoose() {
    if (ball.y + ball.radius >= 400) {
        location.reload();
    }

}

function checkWin() {
    if (brickLength <= 0) {
        alert("Você ganhou!");
        brickLength = bricks.rows * bricks.cols;
        location.reload();

    }
}

function update() {
    movePlayer();
    moveBall();
    checkLoose();
    checkWin();
}

//-----------------------------RENDER------------------/
function renderPlayer() {
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



function renderBricks() {
    bricksArr.forEach((col) => {

        col.forEach((brick) => {
            context.beginPath();

            context.rect(brick.x, brick.y, brick.w, brick.h);

            context.fillStyle = brick.visible ? Colors[score] : "transparent";
            //console.log(score);
            context.fill();

            context.closePath();
            //gerarCor();
        })
    })
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    renderPlayer();
    renderBall();
    renderBricks();



}

function trocaCor() {
    document.body.style = 'background-color:' + Colors[brickLength] + ";";

}
setInterval(trocaCor, 5000);