const fs = require('fs');
async function listarArquivosDoDiretorio(diretorio, arquivos) {
    if (!arquivos)
        arquivos = [];
    let listaDeArquivos = await fs.readdir(diretorio);
    for (let k in listaDeArquivos) {
        let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
        if (stat.isDirectory())
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        else
            arquivos.push(diretorio + '/' + listaDeArquivos[k]);
    }
    return arquivos;
}
async function test() {
    let arquivos = await listarArquivosDoDiretorio('./'); // coloque o caminho do seu diretorio
    console.log(arquivos);
    return arquivos;
}
test();

//  Path: Apps\Reprodutor de musica\Reprodutor 1\js\import.js
// função para importar as musicas
function importar() {
    var arquivos = test();
    for (var i = 0; i < arquivos.length; i++) {
        var musica = new Audio(arquivos[i]);
        var nome = arquivos[i].split('\\');
        var nomeMusica = nome[nome.length - 1];
        var nomeMusica = nomeMusica.split('.');
        var nomeMusica = nomeMusica[0];
        var musica = {
            nome: nomeMusica,
            audio: musica
        }
        musicas.push(musica);
    }
}

// função para importar as informações das musicas
function importarInfo() {
    for (var i = 0; i < musicas.length; i++) {
        var musica = musicas[i];
        var nome = musica.nome;
        var nome = nome.split('-');
        var artista = nome[0];
        var nomeMusica = nome[1];
        var musica = {
            nome: nomeMusica,
            artista: artista,
            audio: musica.audio
        }
        musicas[i] = musica;
    }
}

// função para importar as imagens das musicas

function importarImagem() {
    for (var i = 0; i < musicas.length; i++) {
        var musica = musicas[i];
        var nome = musica.nome;
        var artista = musica.artista;
        var imagem = new Image();
        imagem.src = './imagens/' + artista + '.jpg';
        var musica = {
            nome: nome,
            artista: artista,
            imagem: imagem,
            audio: musica.audio
        }
        musicas[i] = musica;
    }
}

// função para importar as letras das musicas

function importarLetra() {
    for (var i = 0; i < musicas.length; i++) {
        var musica = musicas[i];
        var nome = musica.nome;
        var artista = musica.artista;
        var letra = new Image();
        letra.src = './letras/' + nome + '.jpg';
        var musica = {
            nome: nome,
            artista: artista,
            imagem: musica.imagem,
            letra: letra,
            audio: musica.audio
        }
        musicas[i] = musica;
    }
}

// função para importar as musicas com todas as informações

function importarTudo() {
    importar();
    importarInfo();
    importarImagem();
    importarLetra();
}

//importarTudo();

// função para tocar a musica

function tocarMusica() {
    if (musicaAtual != null) {
        musicaAtual.audio.play();
    }
}

// função para pausar a musica

function pausarMusica() {
    if (musicaAtual != null) {
        musicaAtual.audio.pause();
    }
}

// função para parar a musica

function pararMusica() {
    if (musicaAtual != null) {
        musicaAtual.audio.pause();
        musicaAtual.audio.currentTime = 0;
    }
}

// função para tocar a proxima musica

function proximaMusica() {
    if (musicaAtual != null) {
        var index = musicas.indexOf(musicaAtual);
        if (index < musicas.length - 1) {
            index++;
            musicaAtual = musicas[index];
            tocarMusica();
        }
    }
}

// função para tocar a musica anterior

function musicaAnterior() {
    if (musicaAtual != null) {
        var index = musicas.indexOf(musicaAtual);
        if (index > 0) {
            index--;
            musicaAtual = musicas[index];
            tocarMusica();
        }
    }
}

// função para tocar a musica aleatoria

function musicaAleatoria() {
    if (musicaAtual != null) {
        var index = Math.floor(Math.random() * musicas.length);
        musicaAtual = musicas[index];
        tocarMusica();
    }
}

// função para tocar a musica selecionada

function tocarMusicaSelecionada() {
    var index = parseInt(this.value);
    musicaAtual = musicas[index];
    tocarMusica();
}

// função para criar um vetor com as informações da musica

function criarVetor() {
    for (var i = 0; i < musicas.length; i++) {
        var musica = musicas[i];
        var nome = musica.nome;
        var artista = musica.artista;
        var imagem = musica.imagem;
        var letra = musica.letra;
        var audio = musica.audio;
        var vetor = {
            nome: nome,
            artista: artista,
            imagem: imagem,
            letra: letra,
            audio: audio
        }
        musicas[i] = vetor;
    }
}

// função para criar um vetor com as informações do arquivo

function criarVetorArquivo() {
    for (var i = 0; i < musicas.length; i++) {
        var musica = musicas[i];
        var nome = musica.nome;
        var artista = musica.artista;
        var imagem = musica.imagem;
        var letra = musica.letra;
        var audio = musica.audio;
        var vetor = {
            nome: nome,
            artista: artista,
            imagem: imagem,
            letra: letra,
            audio: audio
        }
        musicas[i] = vetor;
    }
}


//criando playlist

// var playlist = document.getElementById('playlist');
// var lista = document.createElement('ul');
// playlist.appendChild(lista);

// função para criar a playlist

function criarPlaylist() {
    for (var i = 0; i < musicas.length; i++) {
        var musica = musicas[i];
        var nome = musica.nome;
        var artista = musica.artista;
        var imagem = musica.imagem;
        var letra = musica.letra;
        var audio = musica.audio;
        var item = document.createElement('li');
        item.value = i;
        item.innerHTML = nome;
        item.addEventListener('click', tocarMusicaSelecionada);
        lista.appendChild(item);
    }
}

//criarPlaylist();




