// codigo relogio digital em javascript
// Autor: Matheus Mosken Diegues (TeuzinYTBR)
// Data: 10/12/2022
// Versão: 1.0

// Função para atualizar o relogio
// const horas = document.getElementById('horas');
// const minutos = document.getElementById('minutos');
// const segundos = document.getElementById('segundos');

function atualizarRelogio() {
    const data = new Date();
    horas.innerHTML = data.getHours();
    minutos.innerHTML = data.getMinutes();
    // segundos.innerHTML = data.getSeconds();
    let s = data.getSeconds();
    if (s < 10) {
        // console.log("Segundos: "+ '0' + data.getSeconds());
        segundos.innerHTML = '0' + data.getSeconds();
    } else {
        //console.log(data.getSeconds());
        segundos.innerHTML =  data.getSeconds();
}
}

// Função para atualizar o relogio a cada segundo
setInterval(atualizarRelogio, 1000);
 