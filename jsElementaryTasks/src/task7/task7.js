function checkData(lengthOrRest) {
    return true;
}

function calcFibForRest(n) {
    const sq5 = Math.sqrt(5),
        a = (1 + sq5) / 2,
        b = (1 - sq5) / 2;
    return Math.round((Math.pow(a, n) - Math.pow(b, n)) / sq5);
}

function calcFibWithLength(n) {
    let fibonacci = [],
        endPoint;

    fibonacci = [0, 1];
    endPoint = lengthOrRest.length;
    for (let i = 2; i < endPoint; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }
    return fibonacci;
}

function calcFibonacci(lengthOrRest) {
    const maxValue = lengthOrRest.max,
        minValue = lengthOrRest.min,
        lengthValue = lengthOrRest.length;
    let result = [],
        fibonacciNum = 0;

    if (lengthValue) {
        result = calcFibWithLength(lengthValue);
    } else {
        for (let i = 0; fibonacciNum < maxValue; ++i) {
            fibonacciNum = calcFibWithRest(i);
            if (fibonacciNum > maxValue) break;
            fibonacciNum >= minValue ? result.push(fibonacciNum) : 0;
        }
    }
    return result;
}

export default function buildFibonacciRow(lengthOrRest) {
    let result = {
        status: 'failed',
        reason: 'Input object with only max/min values or length',
    };

    if (checkData(lengthOrRest)) {
        result = calcFibonacci(lengthOrRest);
    }
    return result;
}