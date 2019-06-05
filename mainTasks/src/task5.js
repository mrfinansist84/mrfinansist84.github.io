function checkData({
    min,
    max
}) {
    let resCheck = false;
    if (typeof min === 'number' &&
        typeof max === 'number' &&
        String(min).length === 6 &&
        String(max).length === 6) {
        resCheck = true;
    }
    return resCheck;
}

function findLuckyTicketEasy(tiketNumber) {
    let firstThreeNum = Math.floor(tiketNumber / 1000),
        secondThreeNum = tiketNumber % 1000;
    let sumFirstThreeNumbers = 0,
        sumSecondThreeNumbers = 0,
        countEasy = 0;

    while (firstThreeNum > 0) {
        sumFirstThreeNumbers += firstThreeNum % 10;
        firstThreeNum = Math.floor(firstThreeNum / 10);

        sumSecondThreeNumbers += secondThreeNum % 10;
        secondThreeNum = Math.floor(secondThreeNum / 10);
    }
    
    if (sumFirstThreeNumbers === sumSecondThreeNumbers) {
        countEasy = 1;
    }
    return countEasy;
}

function findLuckyTicketHard(tiketNumber) {
    let num = tiketNumber,
        countHard = 0,
        sumOddNumbers = 0,
        sumEvenNumbers = 0,
        numForCheck;

    while (num > 0) {
        numForCheck = num % 10;
        sumOddNumbers += numForCheck % 2 === 1 ? numForCheck : 0;
        sumEvenNumbers += numForCheck % 2 === 0 ? numForCheck : 0;
        num = Math.floor(num / 10);
    }
    
    if (sumOddNumbers === sumEvenNumbers) {
        countHard = 1;
    }
    return countHard;
}


export default function compareCalc(range = {}) {
    let countEasyWay = 0,
        countHardWay = 0,
        result = {
            status: 'failed',
            reason: 'Input only object with min and max number range',
        };

    if (checkData(range)) {
        for (let i = range.min; i < range.max; i++) {
            countEasyWay += findLuckyTicketEasy(i);
            countHardWay += findLuckyTicketHard(i);
        }
        if (countEasyWay > countHardWay) {
            result = (`Выиграл "Простой" метод со счетом ${countEasyWay} 
        против ${countHardWay} у "Сложного"`);
        } else {
            result = `Выиграл "Сложный" метод со счетом ${countHardWay} 
        против ${countEasyWay} у "Простого"`
        }
    }
    return result;
}