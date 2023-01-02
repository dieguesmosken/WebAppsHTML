const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('body');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// ---------------DEFINIÇÕES -----------------//

let ColorsBG = [];
// let ColorsBG = ["#007e47", "#0e224b", "#001b3b"];
//background: linear-gradient(#007e47, #0e224b, #001b3b);

function gerarBGCor() {
    for (let i = 0; i < 3; i++) {

        const letras = '0123456789ABCDEF';
        let cor = '#';
        for (let i = 0; i < 6; i++) {
            cor += letras[Math.floor(Math.random() * 16)];
        }
        ColorsBG.push(cor);
        // console.log(cor);
        // console.log("CorBG: " + ColorsBG.length);

        // let numrand = Math.floor(Math.random() * ColorsBG.length);
        // if (numrand > 0) {
        //     console.log(numrand);
        //     menu.style = 'background: linear-gradient(' +
        //         ColorsBG[ColorsBG.length - 3] +
        //         ',' +
        //         ColorsBG[ColorsBG.length - 2] +
        //         ',' +
        //         ColorsBG[ColorsBG.length - 1] + ");";
        // }
        menu.style = 'background: linear-gradient(' +
            ColorsBG[Math.floor(Math.random() * ColorsBG.length)] +
            ',' +
            ColorsBG[Math.floor(Math.random() * ColorsBG.length)] +
            ',' +
            ColorsBG[Math.floor(Math.random() * ColorsBG.length)] +
            ");";


    }

}
gerarBGCor();
//setInterval(gerarBGCor, 1000);
//setInterval(gerarBGCor, 1000);
// ------------PLAYER MOVEMENTS--------------- //

let moveDirection = "";
document.addEventListener("keydown", (e) => {

    let k = e.keyCode;

    if (k === 37 || k === 65) { // left 
        moveDirection = "left";
    }

    if (k === 38 || k === 87) { // up
        moveDirection = "up";
    }

    if (k === 39 || k === 68) { // right
        moveDirection = "right";

    }

    if (k === 40 || k === 83) { // down
        moveDirection = "bottom";

    }

})

// ------------UPDATE PLAYER FRAMES--------------- //
const player = {
    x: 150,
    y: 650,
    w: 135,
    h: 95,
    dx: 7,
    dy: 7,
    score: 0,
    hp: 3,
    bullets: 555,
}

let playerFrames = [];
playerFrames.length = 7;

for (let i = 1; i < playerFrames.length; i++) {
    playerFrames[i] = new Image();
    playerFrames[i].src = 'spaceship/spaceship (' + i.toString() + ').png';


}
console.log(playerFrames);
let i = 0;

function updateFrames() {
    i++;
    if (i >= 7) i = 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerFrames[i], player.x, player.y, player.w, player.h);


}

setInterval(updateFrames, 1000 / 30);


// ------------UPDATE PLAYER INFO--------------- //
const scoreValue = document.querySelector('.scoreValue');
const bulletsValue = document.querySelector('.bulletsValue');
const hpValue = document.querySelector('.hpValue');

function updatePlayerInfo() {
    scoreValue.innerText = player.score;
    hpValue.innerText = player.hp;
    bulletsValue.innerText = player.bullets;
}

//-------------------RANDOM NUMBER-----------//

function getRandomInt(min, max) {
    console.log(" Max: " + max + ' Min: ' + min);
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log(" Max: " + max + ' Min: ' + min);
    return Math.floor(Math.random() * (max - min) + min);
}

function game() {
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);

function playerMove() {

    // ------ esquerda e direita ------//
    if (moveDirection === "left") {
        player.x -= player.dx;
    }
    if (moveDirection === "right") {
        player.x += player.dx;
    }

    if (player.x >= canvas.width - player.w) {
        player.x = canvas.width - player.w;
    }
    if (player.x <= 0) {
        player.x = 0;
    }
    // ------- pra cima e pra baixo -----//
    if (moveDirection === "up") {
        player.y -= player.dy;
    }
    if (moveDirection === "bottom") {
        player.y += player.dy;
    }

    if (player.y >= canvas.height - player.h) {
        player.y = canvas.height - player.h;
    }
    if (player.y <= 0) {
        player.y = 0;
    }

}

function deleteAsteroid() {
    for (let i in asteroidsArr) {
        if (asteroidsArr[i].y >= 770) {
            asteroidsArr.splice(i, 1);
            player.score++;
        }
    }
}

function update() {
    playerMove();
    updatePlayerInfo();
    deleteAsteroid();
}

//-----------RENDER ASTEROIDS-----------//

const asteroidImg = new Image();
asteroidImg.src = 'asteroids/asteroid1.png';

function movement(asteroid) {
    asteroid.rotate += 0.05;
    asteroid.y += asteroid.dy;
}

let asteroidsArr = [];
let timer = 0;

function renderAsteroids() {
    timer++;
    if (timer % 20 === 0) {
        asteroidsArr.push({
            x: getRandomInt(50, canvas.width),
            y: -20,
            w: 50,
            h: 50,
            dy: getRandomInt(3, 7),
            rotate: 0,

        });
    }

    for (let i in asteroidsArr) {
        movement(asteroidsArr[i]);
        ctx.save();
        ctx.translate(asteroidsArr[i].x, asteroidsArr[i].y);
        ctx.rotate(asteroidsArr[i].rotate);
        ctx.drawImage(asteroidImg, -asteroidsArr[i].w / 2, -asteroidsArr[i].h / 2, asteroidsArr[i].w, asteroidsArr[i].h);
        ctx.restore()
    }
}

function render() {
    ctx.beginPath();
    renderAsteroids();
    ctx.closePath();

}