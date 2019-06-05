function checkArg(arrNumbers, sum) {
    let res = false;
    if (isArray(arrNumbers) &&
        arrNumbers.length >= 2 &&
        arrNumbers.length <= 22 &&
        sum >= -10 &&
        sum <= 10) {
        res = true;
    }
    res = arrNumbers.every((el) => {
        return el >= 0 && el <= 20
    });
    return res;
}

function calcEqualNum(arrNumbers, sum) {
    let sumArrNumbers,
        someN;
    if (checkArg(arrNumbers, sum)) {
        sumArrNumbers = arrNumbers.reduce((acc, cur) => acc + cur);
        someN = sum - sumArrNumbers;
        
    }
}