const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const signs = document.querySelectorAll('.sign');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
console.log("carregamento concluido");


let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;
console.log("declaração de variaveis concluida");

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let atr = e.target.getAttribute('value');
        console.log(atr);
        if (isFirstValue === false) {
            getFirstValue(atr)
            console.log(atr);
        }
        if (isSecondValue === false) {
            getSecondValue(atr)
        }
    })

}
console.log("for concluido");
function getFirstValue(el) {
    result.innerHTML = "";
    firstValue += el;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
    //isFirstValue = true;
    console.log("get first value concluido");
}
function getSecondValue(el) {
    if (firstValue != "" && sign != "") {
        secondValue += el;
        result.innerHTML = secondValue;
        secondValue = +secondValue;
        console.log("if concluido");
    }
    console.log("get second value concluido");
}
function getSign() {
    for (let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click', (e) => {
            sign = e.target.getAttribute('value');
            console.log(sign);
            isFirstValue = true;
            //isSecondValue = false;
        })
    }
    console.log("get sign concluido");
}
getSign();

equal.addEventListener('click', () => {
    result.innerHTML = "";
   // if (sign != "") {
        if (sign === "+") {
            console.log("entrou no if");
            console.log(firstValue);
            console.log("apertou o mais");
            resultValue = firstValue + secondValue;
        } else if (sign === "-") {
            console.log("apertou o menos");
            resultValue = firstValue - secondValue;
        } else if (sign === "x") {
            console.log("apertou o vezes");
            resultValue = firstValue * secondValue;
        } else if (sign === "/") {
            console.log("apertou o dividir");
            resultValue = firstValue / secondValue;
        }
    // } else {
    //     resultValue = firstValue;
    // }
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";

    checkResultLength();
    console.log("apertou o igual");
    console.log(resultValue);

})

function checkResultLength() {
    resultValue = JSON.stringify(resultValue);

    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }
    if (firstValue === "" && secondValue != "" && sign != "") {
        resultValue = -resultValue;
    }
    console.log("apertou o mais ou menos");
    result.innerHTML = resultValue;
})

percent.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;
    }
    if (firstValue === "" && secondValue != "" && sign != "") {
        resultValue = resultValue / 100;
    }
    result.innerHTML = resultValue;
    console.log("apertou o porcento");
})

clear.addEventListener('click', () => {
    result.innerHTML = 0;
    firstValue = "";
    secondValue = "";
    sign = "";
    resultValue = 0;
    isFirstValue = false;
    isSecondValue = false;
    console.log("apertou o clear");
})