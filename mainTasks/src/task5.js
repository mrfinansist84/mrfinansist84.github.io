function checkData({min, max}) {
    if (/* typeof context === 'object' &&  */
    /* context.hasOwnProperty(min) &&
    context.hasOwnProperty(max) &&  */
        typeof min === 'number' &&
        typeof max === 'number' &&
        String(min).length === 6 &&
        String(max).length === 6) {
        return true;
    } else {
        return false;
    }
}



export default function findLuckyTicket(context = {}) {
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
}