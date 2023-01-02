const fs = require('fs').promises;
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
    let arquivos = await listarArquivosDoDiretorio('./arquivos'); // coloque o caminho do seu diretorio
    console.log(arquivos);
    return arquivos;
}
test();