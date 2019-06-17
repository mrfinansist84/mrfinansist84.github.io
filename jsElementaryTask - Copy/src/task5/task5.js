export default function compareCalc(range) {
    let result = checkData(range);

    if (!checkData(range)) {
        let countEasyWay = 0,
            countHardWay = 0,
            winner;

        for (let i = range.min; i < range.max; i++) {
            countEasyWay += findLuckyTicketEasy(i);
            countHardWay += findLuckyTicketHard(i);
        }

        if (countEasyWay === countHardWay) {
            winner = 'Ничья';
        } else {
            winner = countEasyWay > countHardWay ? 'Простой' : 'Сложный';
        }
        result = {
            winner,
            easyWay: countEasyWay,
            hardWay: countHardWay
        }
    }

    return result;
}

function checkData({
    min,
    max
}) {
    let res = false;
    switch (false) {
        case (typeof min === 'string' &&
            typeof max === 'string'):
            res = {
                status: 'failed',
                reason: 'Missed or wrong type of the arguments',
            };
            break;
        case (min.length === 6 &&
            max.length === 6):
            res = {
                status: 'failed',
                reason: 'Wrong length of argument (need 6 members)',
            };
            break;
        case (+min <= +max):
            res = {
                status: 'failed',
                reason: 'The maximum value must be greater than the minimum',
            }
            break;

    }
    return res;
}

function findLuckyTicketEasy(tiketNumber) {
    let firstThreeNum = Math.floor(tiketNumber / 1000),
        secondThreeNum = tiketNumber % 1000,
        sumFirstThreeNumbers = 0,
        sumSecondThreeNumbers = 0,
        countEasy = 0;

    while (firstThreeNum > 0 || secondThreeNum > 0) {
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


