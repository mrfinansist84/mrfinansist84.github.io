import chessBuilder from './src/task1.js';
import putEnvelope from './src/task2.js';
import sortTriangles from './src/task3.js';
/* import checkPalindrom from './src/task4.js'; */
import compareCalc from './src/task5.js';
import findArrNumbers from './src/task6.js';
/*import buildChessBoard from './src/task7.js'; */

/* DONE
task1(need to add checkup)
task2(need to add checkup)
task3(need to add checkup)
task5
task6
*/
/* checkPalindrom(1234437); */
console.log(chessBuilder(6, 4, '+'));

putEnvelope({
    a: 2,
    b: 20
}, {
    c: 2,
    d: 2
})

findArrNumbers(30, 400);

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