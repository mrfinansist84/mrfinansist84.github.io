function checkData(lengthOrRange) {
    let res = false;

    if (!Array.isArray(lengthOrRange) &&
        typeof lengthOrRange !== 'string') {

        if (lengthOrRange.length) {
            if (typeof lengthOrRange.length === 'number' && 
            lengthOrRange.length >= 0) {
                res = true;
            }
        }
        
        if (lengthOrRange.max) {
            const {min, max} = lengthOrRange;
            if (typeof min === 'number' &&
                typeof max === 'number' &&
                min >= 0 &&
                max > 0  &&
                min < max) {
                res = true;
            }
        }
    }
    return res;
}

function calcFibForRange(n) {
    const sq5 = Math.sqrt(5),
        a = (1 + sq5) / 2,
        b = (1 - sq5) / 2;

    return Math.round((Math.pow(a, n) - Math.pow(b, n)) / sq5);
}

function calcFibWithLength(n) {
    let fibonacci = [0, 1];

    for (let i = 2; i < n; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }
    return fibonacci;
}

function calcFibonacci(lengthOrRange) {
    const maxValue = lengthOrRange.max,
        minValue = lengthOrRange.min,
        lengthValue = lengthOrRange.length;

    let result = [],
        fibonacciNum = 0;

    if (lengthValue) {
        result = calcFibWithLength(lengthValue);
    } else {
        for (let i = 0; fibonacciNum < maxValue; ++i) {
            fibonacciNum = calcFibForRange(i);
            if (fibonacciNum > maxValue) break;
            fibonacciNum >= minValue ? result.push(fibonacciNum) : 0;
        }
    }
    return result;
}

function buildFibonacciRow(lengthOrRange) {
    let result = {
        status: 'failed',
        reason: 'Input object with only max/min values or length',
    };

    if (checkData(lengthOrRange)) {
        result = calcFibonacci(lengthOrRange);
    }
    return result;
}

console.log(buildFibonacciRow({
    min: 0,
    max: 11,
}));
console.log(buildFibonacciRow({
    length: 10
}));