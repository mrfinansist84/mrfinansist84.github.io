import chessBuilder from './src/task1.js';
import putEnvelope from './src/task2.js';
import sortTriangles from './src/task3.js';
/* import checkPalindrom from './src/task4.js'; */
import compareCalc from './src/task5.js';
import findrowNumbers from './src/task6.js';
import buildFibonacciRow from './src/task7.js';

/* DONE
task1(need to add checkup)
task2(need to add checkup)
task3(need to add checkup)
task5
task6
*/
/* checkPalindrom(1234437); */

console.log(buildFibonacciRow({min:30, max:650}));
console.log(findrowNumbers(30, 360));

console.log(chessBuilder(6, 4, '+'));

putEnvelope({
    a: 2,
    b: 20
}, {
    c: 2,
    d: 2
})



console.log(compareCalc({
    min: 100099,
    max: 712940
}));

console.log(sortTriangles([{
        vertices: 'ABC',
        a: 10,
        b: 20,
        c: 22.36
    },
    {
        vertices: 'CBA',
        c: 20,
        b: 24.33,
        a: 26
    },
    {
        vertices: 'VCX',
        v: 120,
        c: 24.33,
        x: 100
    }
]));


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