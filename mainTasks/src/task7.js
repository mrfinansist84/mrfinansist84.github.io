function checkData(lengthOrRest) {
    return true;
}

function calcFibonacci(lengthOrRest) {
    let fibonacci,
        startPoint,
        endPoint;

    if (lengthOrRest.length) {
        fibonacci = [0, 1];
        startPoint = 2;
        endPoint = lengthOrRest.length;
    } else {
        fibonacci = calcFibonacci({ length: 50 });
        startPoint = lengthOrRest.min;
        endPoint = lengthOrRest.max;
        return fibonacci.filter(el => el > startPoint && el < endPoint);
    }

    for (let i = startPoint; i < endPoint; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }

    return fibonacci;
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

/* formula BINE 
function fibonacci(n) {
    var sq5 = Math.sqrt(5);
    var a = (1 + sq5) / 2;
    var b = (1 - sq5) / 2;
    return (Math.pow(a, n) - Math.pow(b, n)) / sq5;
  } */