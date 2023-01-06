const fs = require('fs');

//função listar arquivos
function listarArquivos(caminho) {
    return new Promise(resolve => { //retorna uma promessa
        fs.readdir(caminho, (err, arquivos) => { //lê o diretório
            resolve(arquivos); //retorna os arquivos
            console.log(arquivos);


        });


    });


}

//função ler arquivos
function lerArquivos(caminho) {
    return new Promise(resolve => { //retorna uma promessa
        fs.readFile(caminho, (err, conteudo) => { //lê o arquivo
            resolve(conteudo.toString()); //retorna o conteúdo do arquivo
        });
    });
}

//função ler diretório
function lerDiretorio(caminho) {
    listarArquivos(caminho).then(arquivos => { //chama a função listar arquivos
        arquivos.forEach(arquivo => { //percorre os arquivos
            lerArquivos(caminho + '/' + arquivo).then(conteudo => { //chama a função ler arquivos
                console.log(conteudo); //exibe o conteúdo do arquivo
            });
        });
    });
}

//chama a função ler diretório
listarArquivos("./");
lerDiretorio("./");
lerArquivos("./");

// Path: testes\index.js