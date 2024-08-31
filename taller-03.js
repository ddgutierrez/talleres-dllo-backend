function desglosarString(cadena, tipo) {
    const vocales = "aeiouáéíóúAEIOUÁÉÍÓÚ";
    let contador = 0;
    for (let i = 0; i < cadena.length; i++) {
        let caracter = cadena[i];
        if (tipo === "vocales") {
            if (vocales.includes(caracter)) {
                contador++;
            }
        } else if (tipo === "consonantes") {
            if (/[a-zA-ZáéíóúÁÉÍÓÚ]/.test(caracter) && !vocales.includes(caracter)) {
                contador++;
            }
        } else {
            throw new Error("El tipo debe ser 'vocales' o 'consonantes'.");
        }
    }
    return contador;
}

console.log(desglosarString("murcielagos","vocales")); 
console.log(desglosarString("murcielagos","consonantes")); 

function twoSum(nums, target) {
    const numMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    return [];
}

console.log(twoSum([2,7,11,15],9)); 
console.log(twoSum([3,4,2],6));

function conversionRomana(romano) {
    const valoresRomanos = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    let resultado = 0;
    for (let i = 0; i < romano.length; i++) {
        const valorActual = valoresRomanos[romano[i]];
        const valorSiguiente = valoresRomanos[romano[i + 1]];
        if (valorSiguiente && valorActual < valorSiguiente) {
            resultado -= valorActual;
        } else {
            resultado += valorActual;
        }
    }
    return resultado;
}

console.log(conversionRomana("III")); 
console.log(conversionRomana("XIV")); 
console.log(conversionRomana("MMXXIV"));
console.log(conversionRomana("MCMXCVII"));
