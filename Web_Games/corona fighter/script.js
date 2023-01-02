function load_assets() {
    // Enemy object
    enemy_img = new Image();
    enemy_img.src = "Assets/enemy.png";

    // Main user
    player_img = new Image();
    player_img.src = "Assets/fighter.png";

    // Vaccine
    gem_img = new Image;
    gem_img.src = "Assets/vac.gif";

    // Winning sound
    win = new Audio();
    win.src = "Audio/won.wav";

    // Losing sound
    lose = new Audio();
    lose.src = "Audio/dead.mp3";
}

function init() {
    cvs = document.getElementById('mycanvas');

    // Setting the height and width of canvas
    W = cvs.width = 1252;
    H = cvs.height = 516;

    // Getting the context the of canvas
    pen = cvs.getContext('2d');

    // Initially setting the variable to false
    game_over = false;

    // Creating the enemies object with
    // coordinates x y width(w) height(h)
    // and speed  

    e1 = {
        x: 200,
        y: 50,
        w: 80,
        h: 80,
        speed: 20,
    };
    e2 = {
        x: 450,
        y: 150,
        w: 80,
        h: 80,
        speed: 35,
    };

    e3 = {
        x: 700,
        y: 300,
        w: 80,
        h: 80,
        speed: 40,
    };
    e4 = {
        x: 900,
        y: 100,
        w: 80,
        h: 80,
        speed: 30,
    };

    // Array of enemies
    enemy = [e1, e2, e3, e4];

    // Creating the player object
    player = {
            x: 20,
            y: H / 2,
            w: 110,
            h: 110,
            speed: 30,
            health: 100,
            moving: "false"
        }
        // Creating the vaccine gem
    gem = {
        x: W - 150,
        y: H / 2,
        w: 150,
        h: 150,
    }

    // The main part lets move the player
    // using event mouse down and stop 
    //using mouse up
    cvs.addEventListener('mousedown', function() {
        console.log("Mouse Pressed");
        player.moving = true;
    });
    cvs.addEventListener('mouseup', function() {
        console.log("Mouse Released");
        player.moving = false;
    });
}

function isOverlap(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        return true;
    }
    return false;
}

function draw() {
    // Drawing the images
    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(enemy_img, enemy[i].x,
            enemy[i].y, enemy[i].w, enemy[i].h);
    }

    // Draw the player
    pen.drawImage(player_img, player.x,
        player.y, player.w, player.h);

    // Draw the vaccine
    pen.drawImage(gem_img, gem.x,
        gem.y, gem.w, gem.h);

    // Displaying score
    pen.fillStyle = "white";
    pen.font = "30px Roboto";
    pen.fillText("Score " +
        player.health, 30, 30);
}

function update() {
    // If player is moving
    if (game_over) {
        return;
    }
    if (player.moving == true) {
        player.x += player.speed;
        player.health += 20;
    }

    // Checking collision of player
    // with all enemies
    for (let i = 0; i < enemy.length; i++) {
        if (isOverlap(enemy[i], player)) {
            lose.play();
            player.health -= 50;
            if (player.health < 0) {
                draw();
                lose.play();
                alert("You Lose ");
                game_over = true;
                return;
            }
        }
    }

    // checking the player and vaccine
    // collision for the win.
    if (isOverlap(player, gem)) {
        win.play();
        alert("You Won " + player.health);
        game_over = true;
        return;
    }

    // Adjusting the speed and positions
    // of enemy
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed;
        if (enemy[i].y > H - enemy[i].h || enemy[i].y <= 0) {
            enemy[i].speed *= -1;
        }
    }
}

function gameloop() {
    if (game_over) {
        clearInterval(f);
    }
    draw();
    update();
}