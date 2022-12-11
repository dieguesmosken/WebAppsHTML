class Ghost {
    constructor(x, y, width, height, speed, imageX, imageY,imageWid) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = this.direction;
        this.currentFrame = 1;
        this.frameCount = 7;

        setInterval(() => {
            this.changeAnimation();
        }, 100);



    }

    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
        }
        this.checkGhostCollision();
    }
    eat() {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (map[i][j] === 2) {
                    if (this.getMapX() === j && this.getMapY() === i) {
                        map[i][j] = 3;
                        score ++;
                    }
                }
            }
        }
    }

    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_LEFT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTION_DOWN:
                this.y -= this.speed;
                break;
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_DOWN:
                this.y += this.speed;
                break;
        }
    }

    checkCollision() {
        let isCollided = false;
        if (
            map[this.getMapY()][this.getMapX()] === 1 ||
            map[this.getMapYRightSide()][this.getMapX()] === 1 ||
            map[this.getMapY()][this.getMapXRightSide()] === 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] === 1) {
            return true;
        }
        return false;
    }

    checkGhostCollision() {

    }

    changeDirectionIfPossible() {
        if (this.direction === this.nextDirection) {
            return;
        }
        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }

        // switch (this.nextDirection) {
        //     case DIRECTION_RIGHT:
        //         if (map[this.getMapY()][this.getMapXRightSide()] !== 1) {
        //             this.direction = this.nextDirection;
        //         }
        //         break;
        //     case DIRECTION_LEFT:
        //         if (map[this.getMapY()][this.getMapX()] !== 1) {
        //             this.direction = this.nextDirection;
        //         }
        //         break;
        //     case DIRECTION_UP:
        //         if (map[this.getMapY()][this.getMapX()] !== 1) {
        //             this.direction = this.nextDirection;
        //         }
        //         break;
        //     case DIRECTION_DOWN:
        //         if (map[this.getMapYRightSide()][this.getMapX()] !== 1) {
        //             this.direction = this.nextDirection;
        //         }
        //         break;
        // }

    }

    changeAnimation() {
        this.currentFrame = this.currentFrame === this.frameCount ? 1 : this.currentFrame + 1;
    }


    draw() {
        canvasContext.save();
        canvasContext.translate(this.x + oneBlockSize / 2,
            this.y + oneBlockSize / 2
        );
        canvasContext.rotate(this.direction * 90 * Math.PI / 180);
        canvasContext.translate(
            -this.x - oneBlockSize / 2,
            -this.y - oneBlockSize / 2
        );

        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            this.x,
            this.y,
            this.width,
            this.height
        );
        canvasContext.restore();
    }
    getMapX() {
        return parseInt(this.x / oneBlockSize);
    }
    getMapY() {
        return parseInt(this.y / oneBlockSize);
    }
    getMapXRightSide() {
        return parseInt((this.x + 0.999 * oneBlockSize) / oneBlockSize);
    }
    getMapYRightSide() {
        return parseInt((this.y + 0.999 * oneBlockSize) / oneBlockSize);
    }
}