const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('body');



const CanvasOption = 0;

if (CanvasOption === 0) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
} else if (CanvasOption === 1) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

}






dft_bg = new Image();
dft_bg.src = "assets/img/backgrounds/default_bg.png";

bg1 = new Image();
bg1.src = "assets/img/backgrounds/Clouds_3/1.png";
//bg1.src = "assets/img/backgrounds/m1/PRE_ORIG_SIZE.png";


bg2 = new Image();
bg2.src = "assets/img/backgrounds/Clouds_3/1.png";

mo0n = new Image();
mo0n.src = "assets/img/backgrounds/Clouds_3/2.png";



bg1_1 = new Image();
bg1_1.src = "assets/img/backgrounds/m1/1.png";

clouds1_1 = new Image();
clouds1_1.src = "assets/img/backgrounds/m1/2.png";

mountain1_1 = new Image();
mountain1_1.src = "assets/img/backgrounds/m1/3.png";

bottomGrass1_1 = new Image();
bottomGrass1_1.src = "assets/img/backgrounds/m1/4.png";

topGrass1_1 = new Image();
topGrass1_1.src = "assets/img/backgrounds/m1/5.png";

let fps = 60;



let objetos = [
    backG = {
        imagem: "",
        src: "assets/img/backgrounds/m1/1.png",
        x: 0,
        y: 0,
        w: 576,
        h: 324,
        dx: 2
    },
    clouds = {
        imagem: "",
        src: "assets/img/backgrounds/m1/2.png",
        x: 0,
        y: 0,
        w: 576,
        h: 324,
        dx: 2
    },
    mountain = {
        imagem: "",
        src: "assets/img/backgrounds/m1/3.png",
        x: 0,
        y: 0,
        w: 576,
        h: 324,
        dx: 2
    },
    grass1 = {
        imagem: "",
        src: "assets/img/backgrounds/m1/4.png",
        x: 0,
        y: 0,
        w: 576,
        h: 324,
        dx: 2
    },
    grass2 = {
        imagem: "",
        src: "assets/img/backgrounds/m1/5.png",
        x: 0,
        y: 0,
        w: 576,
        h: 324,
        dx: 2
    },
    backG2 = {
        imagem: "",
        src: 'assets/img/backgrounds/Clouds_3/1.png',
        x: 0,
        y: 0,
        w: 576,
        h: 324,
        dx: 2
    },
    moon = {
        imagem: "",
        src: 'assets/img/backgrounds/Clouds_3/2.png',
        x: 0,
        y: 0,
        w: 576,
        h: 324,
        dx: 2
    },


]
const bg = {
    x: 0,
    y: 0,
    w: 576,
    h: 324,
    dx: 2
}


let imageFrames = [];
imageFrames.length = 6;

for (let i = 1; i < imageFrames.length; i++) {
    imageFrames[i] = new Image();
    imageFrames[i].src = 'assets/img/backgrounds/m1/' + i.toString() + '.png';

    console.log(i);

}
console.log(imageFrames);

function deslizarImagem(imagemm, object, vel) {
    ctx.drawImage(imagemm, object.x, object.y, object.w, object.h);
    object.x -= vel / 2;

    if (object.x <= -canvas.width) {
        object.x = 0;
    }
    ctx.drawImage(imagemm, object.x + object.w, object.y, object.w, object.h);
}

function drawBackground(object, dx) {
    for (let i = 0; i < object.length; i++) {
        object[i].imagem = new Image();
        //console.log(object[i].imagem);
        deslizarImagem(object[i].imagem, object, dx);
        //console.log(object[i].imagem);
    }

}

function clearUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function game() {
    update();
    render();
    requestAnimationFrame(game);

}
requestAnimationFrame(game);
//updateBackground(image, object)
function updateBackground(image, object, velocidade) {
    object.x -= velocidade / 2;
    if (object.x <= 0) {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //drawBackground(image, object.x + object.w, object.y, object.w, object.h);
        ctx.drawImage(image, object.x + object.w - 1, object.y, object.w, object.h);
    }
    if (object.x <= -object.w) {

        object.x = 0;

    }
}



function update() {

    // updateBackground(bg1_1, objetos[0], 2);
    // updateBackground(clouds1_1, objetos[1], 2);
    // updateBackground(mountain1_1, objetos[2], 2);
    // updateBackground(bottomGrass1_1, objetos[3], 2);
    // updateBackground(topGrass1_1, objetos[4], 2);

    //  updateBackground(bg1, bg, 2);



}
//console.log(objetos[0].imagem);
console.log(objetos[5]);
console.log(objetos.length);

function render() {
    // bg.desenha(0, 0);

    // drawBackground(bg1_1, objetos[0], 2);
    // drawBackground(clouds1_1, objetos[1], 2);
    // drawBackground(mountain1_1, objetos[2], 2);
    // drawBackground(bottomGrass1_1, objetos[3], 2);
    // drawBackground(topGrass1_1, objetos[4], 2);

    //drawBackground(objetos, 2);




    //deslizarImagem(bg1, objetos[0], 2);
    deslizarImagem(imageFrames[1], objetos[5], 2);

    deslizarImagem(clouds1_1, objetos[1], 3);
    //deslizarImagem(mo0n, objetos[6], 1);

    deslizarImagem(clouds1_1, objetos[1], 3);
    deslizarImagem(mountain1_1, objetos[2], 2);

    deslizarImagem(mountain1_1, objetos[2], 2);



    deslizarImagem(bottomGrass1_1, objetos[3], 3);
    deslizarImagem(topGrass1_1, objetos[4], 3);
    deslizarImagem(bottomGrass1_1, objetos[3], 3);
    deslizarImagem(topGrass1_1, objetos[4], 3);




}

function clearImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
let numlot = []

function loteria(qtd) {
    numlot = [];
    for (let i = 0; i < qtd; i++) {
        let num = Math.floor(Math.random() * 60);
        numlot.push(num);

    }
    for (let i = 0; i < numlot.length; i++) {

        console.log(numlot[i]);
        console.log(" ");
    }
}

//setInterval(clearImage, 1000 / fps);