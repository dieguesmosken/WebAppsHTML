const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
const pacmanFrames = document.getElementById('animations');
const ghostFrames = document.getElementById('ghosts');

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

let fps = 30;
let oneBlockSize = 20;
let wallColor = "#342dca";
let wallSpaceWidth = oneBlockSize / 1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "#000000";
let foodColor = "#feb897";
let score = 0;
let scoreColor = "#fff";
let ghosts = [];
let scoreFont = "40px Retro Land Mayhem";
let locationFont = "20px Retro Land Mayhem";

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_DOWN = 1;
let lives = 3;
let ghostCount = 4;



let ghostLocations = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
];

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let randomTargetsForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    {
        x: (map[0].length - 2) * oneBlockSize,
        y: (map.length - 2) * oneBlockSize
    },

]

let gameLoop = () => {
    update();
    draw();
}

let update = () => {
    pacman.moveProcess();
    pacman.eat();
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess();

    }
    if (pacman.checkGhostCollision()) {
        console.log("hit");
    }
    // ghost.update();
}

let drawFoods = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 2) {
                createRect(
                    j * oneBlockSize + oneBlockSize / 3,
                    i * oneBlockSize + oneBlockSize / 3,
                    oneBlockSize / 3,
                    oneBlockSize / 3,
                    foodColor
                );
            }
        }
    }
}

let drawLocation = () => {
    canvasContext.font = locationFont;
    canvasContext.fillStyle = "white";
    canvasContext.fillText(
        "X: " + pacman.x + " Y: " + pacman.y,
        280,
        oneBlockSize * (map.length + 1) + 15
    );
}



let drawGhostLocation = () => {
    let alturaH = 30;
    let larguraW = 0;
    let locationsColor = [
        "red",
        "orange",
        "pink",
        "cyan",
    ];
    for (let i = 0; i < ghosts.length; i++) {
        canvasContext.font = locationFont;
        canvasContext.fillStyle = locationsColor[i];
        canvasContext.fillText(
            "X: " + ghosts[i].x + " Y: " + ghosts[i].y,
            ghosts[i].x,
            ghosts[i].y
            //larguraW,
            //oneBlockSize * (map.length + 1) + alturaH
        );
        alturaH += (oneBlockSize * 2);
        larguraW += 0;

    }

}

let drawScore = () => {

    canvasContext.font = "40px Retro Land Mayhem";
    canvasContext.fillStyle = scoreColor;
    canvasContext.fillText(
        "Score: " + score,
        5,
        oneBlockSize * (map.length + 1) + 15
    );


}

let drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
}

let draw = () => {

    createRect(0, 0, canvas.width, canvas.height, 'black');
    //canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawWalls();

    pacman.draw();
    drawFoods();
    drawScore();
    drawGhosts();
    drawLocation();
    drawGhostLocation();

    // ghost.draw();
}

let gameInterval = setInterval(gameLoop, 1000 / fps);

let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === 1) {
                createRect(
                    j * oneBlockSize,
                    i * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    wallColor
                );
                if (j > 0 && map[i][j - 1] === 1) {
                    createRect(
                        j * oneBlockSize,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }
                if (j < map[0].length - 1 && map[i][j + 1] === 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }
                if (i > 0 && map[i - 1][j] === 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }
                if (i < map.length - 1 && map[i + 1][j] === 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }
            }
        }
    }
}

let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    );

}

let createGhosts = () => {
    ghosts = []
    for (let i = 0; i < ghostCount; i++) {
        let newGhost = new Ghost(
            9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostLocations[i % 4].x,
            ghostLocations[i % 4].y,
            124,
            116,
            6 + i

        );
        ghosts.push(newGhost);

    }
}

// let createGhosts2 = () => {
//     ghosts = []
//     for (let i = 0; i < 8; i++) {
//         let newGhost2 = new Ghost(
//             9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
//             10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
//             oneBlockSize,
//             oneBlockSize,
//             pacman.speed / 2,
//             ghostLocations[i % 4].x,
//             ghostLocations[i % 4].y,
//             124,
//             116,
//             6 + i

//         );
//         ghosts.push(newGhost2);

//     }
// }

createNewPacman();
createGhosts();
gameLoop();

// //touch controls
// let touchStartX = 0;
// let touchStartY = 0;
// let touchEndX = 0;
// let touchEndY = 0;

// window.addEventListener('touchstart', touchStart, false);
// window.addEventListener('touchend', touchEnd, false);

// let touchStart = (e) => {
//     console.log(e);
//     touchStartX = e.touches[0].clientX;
//     touchStartY = e.touches[0].clientY;
// }

// let touchEnd = (e) => {
//     console.log(e);
//     touchEndX = e.changedTouches[0].clientX;
//     touchEndY = e.changedTouches[0].clientY;
//     handleTouch();
// }

// let handleTouch = () => {
//         let xDiff = touchStartX - touchEndX;
//         let yDiff = touchStartY - touchEndY;

//         console.log(xDiff, yDiff);

//         if (Math.abs(xDiff) > Math.abs(yDiff)) {
//             if (xDiff > 0) {
//                 pacman.nextDirection = DIRECTION_LEFT;
//             } else {
//                 pacman.nextDirection = DIRECTION_RIGHT;
//             }
//         } else {
//             if (yDiff > 0) {
//                 pacman.nextDirection = DIRECTION_UP;
//             } else {
//                 pacman.nextDirection = DIRECTION_DOWN;
//             }
//         }
//     }
//touch start and end
// make touch start controls 

// let touchStart = (e) => {
//     console.log(e);
//     touchStartX = e.touches[0].clientX;
//     touchStartY = e.touches[0].clientY;
// }

// let touchEnd = (e) => {
//     console.log(e);
//     touchEndX = e.changedTouches[0].clientX;
//     touchEndY = e.changedTouches[0].clientY;
//     handleTouch();   
// }

// let handleTouch = () => {
//     let xDiff = touchStartX - touchEndX;
// Touch events
let touchStartX = 0;
let touchStartY = 0;
let touchMoveX = 0;
let touchMoveY = 0;
let touchEndX = 0;
let touchEndY = 0;

canvas.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    touchMoveX = e.touches[0].clientX;
    touchMoveY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', function(e) {
    touchEndX = touchMoveX - touchStartX;
    touchEndY = touchMoveY - touchStartY;
    handleJoystick();
});

function handleJoystick() {
    let deltaX = touchEndX;
    let deltaY = touchEndY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            // Right
            pacman.direction = DIRECTION_RIGHT;
        } else {
            // Left
            pacman.direction = DIRECTION_LEFT;
        }
    } else {
        if (deltaY > 0) {
            // Down
            pacman.direction = DIRECTION_DOWN;
        } else {
            // Up
            pacman.direction = DIRECTION_UP;
        }
    }
}
    

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            pacman.nextDirection = DIRECTION_UP;
            break;
        case 'ArrowDown':
            pacman.nextDirection = DIRECTION_DOWN;
            break;
        case 'ArrowLeft':
            pacman.nextDirection = DIRECTION_LEFT;
            break;
        case 'ArrowRight':
            pacman.nextDirection = DIRECTION_RIGHT;
            break;
    }
});
// window.addEventListener('keydown', (event) => {
//     let k = event.keyCode

//     setTimeout(() => {
//         if (k === 37 || k === 65) { // left 
//             pacman.nextDirection = DIRECTION_LEFT;
//         }

//         if (k === 38 || k === 87) { // up
//             pacman.nextDirection = DIRECTION_UP;
//         }

//         if (k === 39 || k === 68) { // right
//             pacman.nextDirection = DIRECTION_RIGHT;

//         }

//         if (k === 40 || k === 83) { // down
//             pacman.nextDirection = DIRECTION_DOWN;

//         }

//     }, 1);


// });
