function findMax(numeros){
    let max=numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > max) {
            max=numeros[i];
        }
    }
    return max;
}
console.log(findMax([3,17,1,4,19]));

function includes(numeros,numero){
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] == numero) {
            return true;
        }
    }
    return false;    
}

console.log(includes([3,17,-1,4,-19],2));
console.log(includes([3,17,-1,4,-19],4));

function sum(numeros){
    let suma=0;
    for (let i = 0; i < numeros.length; i++) {
        suma=suma+numeros[i];
    }
    return suma;
}
console.log(sum([3,17,-1,4,-19]));
function missingNumbers(numbers) {
    let min = numbers[0];
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    let missing = [];
    for (let i = min; i <= max; i++) {
        /*if (!numbers.includes(i)) {
            missing.push(i);
        }*/
        let found = false;
        for (let j = 0; j < numbers.length; j++) {
            if (numbers[j] === i) {
                found = true;
                break;
            }
        }
        if (!found) {
            missing.push(i);
        }
    }
    return missing;
}
console.log(missingNumbers([1,3,7,10]));  
console.log(missingNumbers([7,2,4,6,3,9]));