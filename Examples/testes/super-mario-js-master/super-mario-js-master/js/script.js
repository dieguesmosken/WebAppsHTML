var x, y, boneco;

function define() {
    nochao = 1; //se ele nao ta pulando ou caindo
    cblocos = 0;
    boneco = document.getElementById("boneco");
    mapa = document.getElementById("mapa");
    altura_mapa = 600;
    largura_mapa = 800;
    tamanho = 'pequeno';
    //	altura = 39; largura = 26;
    altura = 21;
    largura = 17;
    x = 100;
    y = altura_mapa - altura;
    //mov = 2;
    direcao = 0;
    lado = 'direita';
    cont_anda = 0;

    boneco.style.height = altura + 'px';
    boneco.style.width = largura + 'px';
    boneco.style.top = y + "px";
    boneco.style.left = x + "px";

    mapa.style.height = altura_mapa + "px";
    mapa.style.width = largura_mapa + "px";


    anima_anda('normal' + lado + tamanho);

    cria_mapa();
}

function cria_mapa() {
    iniciablocos();
    var c;

    for (c_chao = 0; c_chao < largura_mapa - 20; c_chao = c_chao + 19) {
        criabloco('chao', c_chao, altura_mapa);
    }

    //	for(c=0;c<largura_mapa-60;c=c+17){
    //		criabloco('bloco',c,altura_mapa-56);
    //	}

    criabloco('fb', 50, 530);
    criabloco('tt', 80, 530);
    criabloco('in', 110, 530);


    criabloco('bloco', 50, 50);
    criabloco('bloco', 120, 70);
    criabloco('bloco', 220, 70);
    criabloco('bloco', 190, 130);
    criabloco('bloco', 250, 150)
    criabloco('bloco', 120, 170);
    criabloco('bloco', 220, 200);
    criabloco('bloco', 150, 270);
    criabloco('bloco', 80, 270);

}

function iniciablocos() {
    bloco = new Array();

    posicao = new Array();
    var c, i;
    for (c = 0; c < largura_mapa; c++) {
        posicao[c] = new Array();
        for (i = 0; i < altura_mapa; i++) {
            posicao[c][i] = false;
        }
    }


}

function criabloco(btipo, bx, by) {
    var blargura, baltura, bclasse, bnome;

    cblocos++;
    bnome = 'b' + cblocos;


    if (btipo == 'chao') {
        blargura = 20;
        baltura = 20;
        bclasse = 'chao';
    }
    if (btipo == 'blocoazul') {
        blargura = 16;
        baltura = 16;
        bclasse = 'blocoazul';
    }

    if (btipo == 'bloco') {
        blargura = 16;
        baltura = 16;
        bclasse = 'bloco';
    }
    if (btipo == 'fb') {
        blargura = 16;
        baltura = 16;
        bclasse = 'blocofb';
    }
    if (btipo == 'tt') {
        blargura = 16;
        baltura = 16;
        bclasse = 'blocott';
    }
    if (btipo == 'in') {
        blargura = 16;
        baltura = 16;
        bclasse = 'blocoin';
    }


    var divTag = document.createElement("div");
    divTag.style.top = by + "px";
    divTag.style.left = bx + "px";
    divTag.style.width = blargura + "px";
    divTag.style.height = baltura + "px";
    divTag.className = bclasse;
    divTag.id = bnome;
    document.getElementById('mapa').appendChild(divTag);

    bloco[cblocos] = new Array();
    bloco[cblocos]['tipo'] = btipo;
    bloco[cblocos]['x'] = bx;
    bloco[cblocos]['y'] = by;


    posicao[bx][by] = cblocos;
    posicao[bx][by + baltura] = cblocos;
    posicao[bx + blargura][by] = cblocos;
    posicao[bx + blargura][by + baltura] = cblocos;

    for (c = 0; c <= blargura; c = c + largura) {
        for (i = 0; i <= baltura; i = i + altura) {
            posicao[bx + c][by + i] = cblocos;

        }
    }


}

function desenha() {
    var mapaleft = document.getElementById('mapa').offsetLeft;
    var y = event.clientY;
    var ly = (y)
    var x = event.clientX;
    var lx = (x)
    criabloco('blocoazul', x - mapaleft, y);
}

document.onkeyup = function(event) {
    if (direcao != 'pula') {
        direcao = 0;
        anima_anda('normal' + lado + tamanho);
    }
}
document.onkeydown = function(event) {

    var tecla; //variavel pra receber a tecla que foi pressionada

    if (event == null) { tecla = window.event.keyCode; } //recebe a tecla que foi pressionada (dei ctr+c ctrl+v então não sei pq as duas linhas, deve ser
    else { tecla = event.keyCode; } // para funcionar em todos navegadores)

    if (window.event.ctrlKey) { mov = 4; } else { mov = 2; }

    //switch para identivificar a tecla pressionada e realizar a ação
    switch (tecla) {

        //esquerda
        case 37:
            move(boneco, 'esquerda');
            break;
            //direita
        case 39:
            move(boneco, 'direita');
            break;

            //cima
        case 38:
            //espaço
            //case 32: 
            move(boneco, 'cima');
            break;

            //baixo
        case 40:
            boneco.className = "baixo" + lado + tamanho;
            //y=y+mov;
            //boneco.style.top=y+"px";
            //direcao = 'baixo';

            break;

    }
}

function move(melemento, mdirecao) {
    if (mdirecao == 'esquerda') {
        lado = 'esquerda';
        direcao = 'esquerda';
        if (nochao == 1) {
            anima_anda(lado + tamanho);

            if (!colide(x - mov, y, largura, altura)) {
                x = x - mov;
                melemento.style.left = x + "px";
            }
            if (!colide(x, y + 1, largura, altura)) {
                cai(boneco);
            }
        }
    }
    if (mdirecao == 'direita') {
        lado = 'direita';
        direcao = 'direita';
        if (nochao == 1) {
            anima_anda(lado + tamanho);

            if (!colide(x + mov, y, largura, altura)) {
                x = x + mov;
                melemento.style.left = x + "px";
            }

            if (!colide(x, y + 1, largura, altura)) {
                cai(boneco);
            }

        }

    }
    if (mdirecao == 'cima') {
        melemento.className = "cima" + lado + tamanho;
        //y=y-mov;
        //boneco.style.top=y+"px";
        if (direcao != 'pula' && nochao != 0) {
            pula();
        }
        direcao = 'pula';

    }
}


function pula() {
    var velocidade = 5;
    var p = 1;
    var p_topo = 70;
    cont_pula = 0;
    nochao = 0;

    var tempo_pula = setInterval(function() {
        cont_pula++;
        y = y - /*cont_pula*/ p;
        boneco.style.top = y + "px";
        if (direcao == 'esquerda' && x - mov > 0 && !colide(x - p, y - p, largura, altura)) {
            x = x - p;
            boneco.style.left = x + "px";
        }
        if (direcao == 'direita' && x + mov + largura < largura_mapa && !colide(x + p, y - p, largura, altura)) {
            x = x + p;
            boneco.style.left = x + "px";
        }

        if (cont_pula > p_topo || (colide(x, y - p, largura, altura) && y > 0)) {
            clearInterval(tempo_pula);
            cont_pula = 0;
            cai(boneco);
        }
    }, velocidade);


}


function anima_anda(direcao) {


    if (cont_anda == 0) {
        setTimeout(function() {
            boneco.className = direcao;
            cont_anda++;
        }, 100);
    } else {
        setTimeout(function() {
            boneco.className = "normal" + lado + tamanho;
            cont_anda = 0;
        }, 100);

    }


}

function cai(celemento) {
    var velocidade = 5;
    var p = 1;
    //var cont_cai = 0;
    nochao = 0;
    direca = 'cai';
    var tempo_pula2 = setInterval(function() {
        //cont_cai++;
        y = y + /*(cont_cai)*/ p;

        celemento.style.top = y + "px";

        if (direcao == 'esquerda' && x - mov > 0 && !colide(x - p, y, largura, altura)) {
            x = x - p;
            celemento.style.left = x + "px";
        }
        if (direcao == 'direita' && x + mov + largura < largura_mapa && !colide(x + p, y, largura, altura)) {
            x = x + p;
            celemento.style.left = x + "px";
        }

        if (colide(x, y + p, largura, altura) && y > 0) {
            //cont_cai =0;
            direcao = 0;
            anima_anda('normal' + lado + tamanho);
            nochao = 1;
            clearInterval(tempo_pula2);

        }

    }, velocidade);
}

function colide(px, py, largura_colide, altura_colide) {
    var col = 0;
    for (c = 0; c < largura_colide; c++) {
        for (i = 0; i < altura_colide; i++) {
            if (posicao[px + c][py + i] != false) {
                col++;
                if (cont_pula > 0 && bloco[posicao[px + c][py + i]]['tipo'] == 'in') { window.open('http://br.linkedin.com/in/omarjadalla', '_blank'); }
                if (cont_pula > 0 && bloco[posicao[px + c][py + i]]['tipo'] == 'tt') { window.open('http://br.twitter.com/omarjadalla', '_blank'); }
                if (cont_pula > 0 && bloco[posicao[px + c][py + i]]['tipo'] == 'fb') { window.open('http://fb.com/omarmedeirosjadalla', '_blank'); }
            }
        }
    }
    if (col == 0) { return false; } else { return true; }
}