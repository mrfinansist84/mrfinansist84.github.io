import chessBuilder from './src/task1/task1.js';
import checkEntersEnvelope from './src/task2/task2.js';
import sortTriangles from './src/task3/task3.js';
import checkPalindrom from './src/task4/task4.js';
import compareCalc from './src/task5/task5.js';
import findRowNumbers from './src/task6/task6.js';
import buildFibonacciRow from './src/task7/task7.js';

console.log(chessBuilder(4, 4, '@'));

console.log(checkEntersEnvelope({
    a: 30,
    b: 40
}, {
    p: 20,
    q: 30
}));

console.log(sortTriangles([{
    vertices: 'ABC',
    a: 10,
    b: 20,
    c: 20
},
{
    vertices: 'CBA',
    c: 20,
    b: 24.33,
    a: 26
}]));

console.log(checkPalindrom(5345354122145111));

console.log(compareCalc({
    min: '000100',
    max: '100999'
}));

console.log(findRowNumbers(3, 25));

console.log(buildFibonacciRow({
    min: 0,
    max: 10,
}));