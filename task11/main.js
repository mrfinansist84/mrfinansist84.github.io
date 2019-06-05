function checkArg(arrNumbers, sum) {
    let res = false;
    if (arrNumbers.length >= 2 &&
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
        targetSum,
        result = false;
    if (checkArg(arrNumbers, sum)) {
        sumArrNumbers = arrNumbers.reduce((acc, cur) => acc + cur); //сумма чисел в массиве
        targetSum = Math.abs(sum - sumArrNumbers); //сумма целевая по модулю

        for (let i = 1; i < arrNumbers.length; i++) {
            if (arrNumbers[i] * 2 === targetSum) {
                result = true;
                break;
            }
        }
        
        for (let i = 1; i < arrNumbers.length; i++) {
            for (let j = 2; j < arrNumbers.length; j++) {
                
                if (arrNumbers[i] * 2 + arrNumbers[j] * 2 === targetSum) {
                    result = true;
                    break;
                }
            }
        }
    }
    return result;
}

console.log(calcEqualNum([1, 5, 3, 2, 5], -2))