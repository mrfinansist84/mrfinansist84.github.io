import chessBuilder from './src/task1.js';
import putEnvelope from './src/task2.js';
import sortTriangles from './src/task3.js';
/* import checkPalindrom from './src/task4.js'; */
import findLuckyTicket from './src/task5.js';
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
console.log(chessBuilder(5, 4, '+'));

putEnvelope({
    a: 2,
    b: 20
}, {
    c: 2,
    d: 2
})

findArrNumbers(30, 400);

findLuckyTicket({
    min: 311133,
    max: 411112
});

sortTriangles([{
        vertices: 'ABC',
        a: 10,
        b: 20,
        c: 22.36
    },
    {
        vertices: 'CBA',
        a: 20,
        b: 24.33,
        c: 26
    }
]);