const btn = document.querySelector('.btn');
const rstScore = document.querySelector('.rstScore');
const placarSpan = document.getElementById("placar");

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let score = 1;
let snake = [];
let direction = "right";
let color = 0;
let Colors = [
    "green",
    "red"
];
let ColorsBG = [
    Colors[0],
    Colors[1]
];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}


let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}



function criarBG() {
    context.fillStyle = Colors[snake.length + 1];
    btn.style = 'color: black;' + 'background-color:' + Colors[snake.length + 1] + ";" + 'border: 1px solid ' + Colors[snake.length] + ";";

    // context.fillStyle = ColorsBG[ColorsBG.length - 1];
    context.fillRect(0, 0, 16 * box, 16 * box);

}

function gerarCor() {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    Colors.push(cor);
    console.log(cor);
    console.log(Colors.length);

    //placar.style = 'color:' + Colors[snake.length] + ";";
    //placar.style = 'background-color:' + Colors[snake.length] + ";";
    //container.style = 'background-color:' + Colors[snake.length] + ";";

}

function gerarBGCor() {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    ColorsBG.push(cor);
    console.log(cor);
    console.log("CorBG: " + ColorsBG.length);

    //placar.style = 'color:' + Colors[snake.length] + ";";
    //placar.style = 'background-color:' + Colors[snake.length] + ";";
    //container.style = 'background-color:' + Colors[snake.length] + ";";

}


gerarCor();
gerarBGCor();
let colorActive = 0;

function criarCobrinha() {

    for (i = 0; i < snake.length; i++) {

        colorActive = 0;
        if (colorActive < snake.length) {

            context.fillStyle = Colors[i];
            context.fillRect(snake[i].x, snake[i].y, box, box);
            colorActive++;


        } else {
            console.log("else 1");

        }

    }
}


// function drawFood() {
//     context.fillStyle = Colors[snake.length];
//     context.fillRect(food.x, food.y, box, box);
// }



function draw2(color, object) {
    context.fillStyle = color;
    context.fillRect(object.x, object.y, box, box);
}

function drawFood() {
    draw2(Colors[snake.length], food);
}

document.addEventListener("keydown", update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";


}



function iniciarJogo() {

    score = snake.length;

    if (snake[0].x > 15 * box + box && direction == "right") snake[0].x = -box;
    if (snake[0].x < 0 * box - box && direction == "left") snake[0].x = 16 * box + box;

    // if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    // if (snake[0].x < 0 && box && direction == "left") snake[0].x = 16 * box;



    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && box && direction == "up") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            // clearInterval(jogo);
            restart();
            alert('Game Over :/ ');
        }
    }


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        gerarCor();
        gerarBGCor();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    // inicio da area em desenvolvimento 
    function placar() {

        for (i = 1; i < snake.length; i++) {

            if (snakeX != food.x || snakeY != food.y) {
                i += 1;
                placarSpan.innerHTML = ('0000' + (score - 1)).slice(-4);
            }
        }
    }


    function draw() {
        criarBG();
        criarCobrinha();
        drawFood();
        placar();
    }
    draw();

    // fim da area em desenvolvimento
}

let jogo = setInterval(iniciarJogo, 100);

function restart() {
    direction = "right";

    ColorsBG = [];
    gerarBGCor();
    Colors = [
        "green",
        "red"
    ];
    gerarCor();

    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }


    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    if (score != 1) {
        for (i = 0; i < (score - 1); i++) {
            snake.pop();

        }
    }

    score = 1;
    placarSpan.innerHTML = ('0000' + (score - 1)).slice(-4);
}