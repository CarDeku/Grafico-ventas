import data from './data.json' assert {type: 'json'};

//contenedor del grafico
let chartBarsContainer = document.querySelector('.chart__bars-container');

let value = [];

data.forEach(element => {
    //agregamos los valores del grafico al arreglo value
    value.push(element.amount);
    chartBarsContainer.innerHTML += `<div class="chart__bar">
    <div class="chart__bar--label">$${element.amount}</div>
    <div class="chart__bar--day">${element.day}</div>
  </div>`
});


let maxValue = Math.max(...value);

/* 
calcular la altura de las barras del grafico
alturaActualPx = (nuevoValor * alturaMaxBarpx) / maxValue
ej:
52.36 -> 150px
17.45 -> x
x = (17.45 * 200) / 52.36 
*/

let bars = document.querySelectorAll('.chart__bar');
//transformamos el nodelist bars a un arreglo
bars = [...bars];

bars.forEach(bar => {
    //cambiar la altura de las barras
    let nuevoValor = parseFloat(bar.childNodes[1].innerText.slice(1));
    let alturaActualPx = (nuevoValor * 150) / maxValue;

    bar.style.height = `${alturaActualPx}px`;

    //pintar la barra mas alta
    if(nuevoValor == maxValue){
        bar.style.backgroundColor = 'hsl(186, 34%, 60%)';
    }    

    bar.addEventListener('mouseover', event => {
        if(event.target.className != 'chart__bar--day'){
            let labelElement = event.target.childNodes[1];
            labelElement.style.display = 'block';
        }
    });
    bar.addEventListener('mouseout', event => {
        if(event.target.className != 'chart__bar--day'){
            let labelElement = event.target.childNodes[1];
            labelElement.style.display = 'none';
        }
    });
});


