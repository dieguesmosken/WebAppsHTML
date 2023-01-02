var canvas, contexto, ALTURA, LARGURA, frames = 0,
    maxPulos = 3,
    velocidade = 6,
    estadoAtual, record, img,

    estados = {
        jogar: 0,
        jogando: 1,
        perdeu: 2
    },
    chao = {
        y: 550,
        x: 0,
        altura: 50,

        atualiza: function() {
            this.x -= velocidade;
            if (this.x <= -30) {
                this.x = 0;
            }
        },


        desenha: function() {
            spriteChao.desenha(this.x, this.y);
            spriteChao.desenha(this.x + spriteChao.largura, this.y);
        }
    },
    background = {
        y: 0,
        x: 0,
        altura: 50,

        atualiza: function() {
            this.x -= velocidade;
            if (this.x <= 0) {
                this.x = 600;
            }
        },


        desenha: function() {
            bg.desenha(this.x, this.y);
            bg.desenha(this.x + bg.largura, this.y);
        }
    },

    bloco = {
        x: 50,
        y: 0,
        altura: spriteBoneco.altura,
        largura: spriteBoneco.largura,

        gravidade: 1.6,
        velocidade: 0,
        forcaDoPulo: 23.6,
        qntPulos: 0,
        score: 0,
        rotacao: 0,

        atualiza: function() {
            this.velocidade += this.gravidade;
            this.y += this.velocidade;
            this.rotacao += Math.PI / 180 * velocidade;

            if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu) {
                this.y = chao.y - this.altura
                this.qntPulos = 0;
                this.velocidade = 0;
            }
        },

        pula: function() {
            if (this.qntPulos < maxPulos) {
                this.velocidade = -this.forcaDoPulo;
                this.qntPulos++;
            }

        },

        reset: function() {
            this.velocidade = 0;
            this.y = 0;

            if (this.score > record) {
                localStorage.setItem("record", this.score);
                record = this.score;
            }
            this.score = 0;
        },

        desenha: function() {
            contexto.save();
            contexto.translate(this.x + this.largura / 2, this.y + this.altura / 2)
            contexto.rotate(this.rotacao);
            spriteBoneco.desenha(-this.largura / 2, -this.altura / 2);
            contexto.restore();
        }
    },
    obstaculos = {
        _obs: [],
        cores: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"],
        tempoInsere: 0,
        insere: function() {
            this._obs.push({
                x: LARGURA,
                //largura: 30 + Math.floor(20 * Math.random()),
                largura: 50,
                altura: 30 + Math.floor(120 * Math.random()),
                cor: this.cores[Math.floor(5 * Math.random())]
            });

            this.tempoInsere = 30 + Math.floor(20 * Math.random());
        },
        atualiza: function() {
            if (this.tempoInsere == 0) {
                this.insere();
            } else {
                this.tempoInsere--;
            }
            for (var i = 0, tam = this._obs.length; i < tam; i++) {
                var obs = this._obs[i];
                obs.x -= velocidade;
                if (bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= chao.y - obs.altura) {
                    estadoAtual = estados.perdeu;
                } else if (obs.x == 0) {
                    bloco.score++;

                } else if (obs.x <= -obs.largura) {
                    this._obs.splice(i, 1);
                    tam--;
                    i--;
                }

            }
        },
        limpa: function() {
            this._obs = [];
        },
        desenha: function() {
            for (var i = 0, tam = this._obs.length; i < tam; i++) {
                var obs = this._obs[i];
                contexto.fillStyle = obs.cor;
                contexto.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
            }
        }
    };

function clique(event) {
    if (estadoAtual == estados.jogando)
        bloco.pula();

    else if (estadoAtual == estados.jogar) {
        estadoAtual = estados.jogando;
    } else if (estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA) {
        estadoAtual = estados.jogar;
        obstaculos.limpa();
        bloco.reset();
    }
}

function main() {
    ALTURA = window.innerHeight;
    LARGURA = window.innerWidth;

    if (LARGURA >= 500) {
        LARGURA = 600;
        ALTURA = 600;
    }
    canvas = document.createElement('canvas');
    canvas.width = LARGURA;
    canvas.height = ALTURA;
    canvas.style.border = "1px solid #000";

    contexto = canvas.getContext("2d");
    document.body.appendChild(canvas);
    document.addEventListener("mousedown", clique);

    estadoAtual = estados.jogar;
    record = localStorage.getItem("record");
    if (record == null)
        record = 0;

    img = new Image();
    img.src = "img/sheet.png";

    roda();
}

function roda() {
    atualiza();
    desenha();

    window.requestAnimationFrame(roda);
}

function atualiza() {
    chao.atualiza();
    bloco.atualiza();
    if (estadoAtual == estados.jogando) {
        obstaculos.atualiza();
    }



}

function desenha() {
    //contexto.fillStyle = "#80daff";
    //contexto.fillRect(0, 0, LARGURA, ALTURA);

    background.desenha(0, 0);
    // bg.desenha(0, 0);
    //só teste spriteBoneco.desenha(50, 50);

    contexto.fillStyle = "#fff";
    contexto.font = "50px Arial";
    contexto.fillText(bloco.score, 30, 68);
    if (estadoAtual == estados.jogando) {
        obstaculos.desenha();
    }
    chao.desenha();
    bloco.desenha();
    if (estadoAtual == estados.jogar)
        jogar.desenha(LARGURA / 2 - jogar.largura / 2, ALTURA / 2 - jogar.altura / 2)

    if (estadoAtual == estados.perdeu) {
        perdeu.desenha(LARGURA / 2 - perdeu.largura / 2, ALTURA / 2 - perdeu.altura / 2 - spriteRecord.altura / 2);

        spriteRecord.desenha(LARGURA / 2 - spriteRecord.largura / 2, ALTURA / 2 + perdeu.altura / 2 - spriteRecord.altura / 2 - 25);
        contexto.fillStyle = "#fff";
        contexto.fillText(bloco.score, 375, 390);

        if (bloco.score > record) {
            novo.desenha(LARGURA / 2 - 180, ALTURA / 2 + 30);
            contexto.fillText(bloco.score, 420, 470);
        } else {
            contexto.fillText(bloco.score, 420, 470);
        }
    }
    /* else if (estadoAtual == estados.jogar) {
         contexto.fillStyle = "green";
         contexto.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);
     }
     else if (estadoAtual == estados.perdeu) {
         contexto.fillStyle = "red";
         contexto.fillRect(LARGURA / 2 - 50, ALTURA / 2 - 50, 100, 100);

         contexto.save();
         contexto.translate(LARGURA / 2, ALTURA / 2);
         contexto.fillStyle = "#fff";

         if (bloco.score > record)
             contexto.fillText("Novo Record!", -150, -65)

         else if (record < 10)
             contexto.fillText("Record " + record, -99, -65)

         else if (record >= 10 && record < 100)
             contexto.fillText("Record " + record, -112, -65)
            
         else
             contexto.fillText("Record " + record, -125, -65)

         if (bloco.score < 10)
             contexto.fillText(bloco.score, -13, 19);

         else if (bloco.score >= 10 && bloco.score < 100)
             contexto.fillText(bloco.score, -26, 19)
         else
             contexto.fillText(bloco.score, -39, 19)
         contexto.restore();
     }
     */



}
// inicializar
main();