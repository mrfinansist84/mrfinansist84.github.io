function buildFibonacciRow(lengthOrRange) {
    let result = checkData(lengthOrRange);

    if (!checkData(lengthOrRange)) {
        result = calcFibonacci(lengthOrRange);
    }

    return result;
}

function checkData(lengthOrRange) {
    const errorType = {
            status: 'failed',
            reason: 'Wrong type of the arguments',
        },
        errorValue = {
            status: 'failed',
            reason: 'Value of arguments must be longer 0',
        };
    let res = false;

    if (!Array.isArray(lengthOrRange) &&
        typeof lengthOrRange !== 'string') {

        if (lengthOrRange.length) {
            switch (false) {
                case (typeof lengthOrRange.length === 'number'):
                    res = errorType;
                    break;
                case (lengthOrRange.length >= 0):
                    res = errorValue;
                    break;
            }
        }

        if (lengthOrRange.max > -1) {
            const {
                min,
                max
            } = lengthOrRange;

            switch (false) {
                case (typeof min === 'number' &&
                    typeof max === 'number'):
                    res = errorType;
                    break;

                case (min >= 0 &&
                    max > 0):
                    res = errorValue;
                    break;

                case (min < max):
                    res = {
                        status: 'failed',
                        reason: 'The maximum value must be greater than the minimum',
                    };
                    break;
            }
        }

    } else {
        res = {
            status: 'failed',
            reason: 'Not object passed to the arguments',
        };
    }

    return res;
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
    };

    return result;
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



console.log(buildFibonacciRow({
    min: 0,
    max: 10,
}));