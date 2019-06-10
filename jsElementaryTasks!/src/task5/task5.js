function checkData({min,max}) {
    let resCheck = false;
    if (typeof min === 'string' &&
        typeof max === 'string' &&
        min.length === 6 &&
        max.length === 6) {
        resCheck = true;
    }
    return resCheck;
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


function compareCalc(range = {}) {
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



/* function checkData({min, max}) {
    if ( typeof min === 'number' &&
        typeof max === 'number' &&
        String(min).length === 6 &&
        String(max).length === 6) {
        return true;
    } else {
        return false;
    }
}

function findLuckyTicket(context = {}) {
    if (checkData(context)) {
        let countLTEW = 0;
        let countLTDW = 0;
        for (let i = context.min; i < context.max; i++) {
            let firstThreeNumbers = String(i).split('').slice(0, 3)
                .reduce((acc, cur) => +acc + +cur);

            let secondThreeNumbers = String(i).split('').slice(3, 6)
                .reduce((acc, cur) => +acc + +cur);

            if (firstThreeNumbers === secondThreeNumbers) {
                countLTEW += 1;
            }
            let evenNumbers = String(i).split('').filter(num => num % 2 == 0)
                .reduce(((acc, cur) => +acc + +cur), 0);
            let oddNumbers = String(i).split('').filter(num => num % 2 == 1)
                .reduce(((acc, cur) => +acc + +cur), 0);
            if (evenNumbers === oddNumbers) {
                countLTDW += 1;
            }
        }
        if (countLTEW > countLTDW) {
            return (`Выиграл "Простой" метод со счетом ${countLTEW} 
        против ${countLTDW} у "Сложного"`);
        } else {
            return `Выиграл "Сложного" метод со счетом ${countLTDW} 
        против ${countLTEW} у "Простой"`
        }
    } else {
        return ({
            status: 'failed',
            reason: 'Input only object with min and max number range',
        })
    }
} */