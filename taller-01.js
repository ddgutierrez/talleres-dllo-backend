function convertidorTemp(celsius) {
    return  (celsius * 9/5) + 32;
}

let tempCelsius = 0;
console.log(convertidorTemp(tempCelsius));

function resolvedor(a, b, c, positivo = true) {
    let discriminante = Math.pow(b, 2) - 4 * a * c;
    
    if (discriminante < 0) {
        return "No hay solucion real";
    }
    
    let raizDiscriminante = Math.sqrt(discriminante);
    
    let x1 = (-b + raizDiscriminante) / (2 * a);
    let x2 = (-b - raizDiscriminante) / (2 * a);
    
    if(positivo){
        return x1;
    }else{
        return x2;
    }
}

let a = 1, b = 5, c = 4;
let resultadoPositivo = resolvedor(a, b, c, true);
let resultadoNegativo = resolvedor(a, b, c, false);

console.log(resultadoPositivo);
console.log(resultadoNegativo);

function mejorParidad(numero) {
    if (numero % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

let numero = 10;
console.log(mejorParidad(0));

function peorParidad(numero) {
    if (numero == 0){
        return true;
    } else if (numero === 1) {
        return false;
    } else if (numero === 2) {
        return true;
    } else if (numero === 3) {
        return false;
    } else if (numero === 4) {
        return true;
    } else if (numero === 5) {
        return false;
    } else if (numero === 6) {
        return true;
    } else if (numero === 7) {
        return false;
    } else if (numero === 8) {
        return true;
    } else if (numero === 9) {
        return false;
    } else if (numero === 10) {
        return true;
    }
}

numero = 5;
for (let i=0;i<11;i++){
    console.log(i+' '+peorParidad(i));
    
}