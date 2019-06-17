describe(`Числовая последовательность. Основная функция findRowNumbers.
Принимает 2 параметра: длину ряда чисел и значение минимального квадрата. 
   Расчитывает точку старта расчета в переменную startNumber
   (корень квадратный из минимального квадрата) и выводит ряд чисел, 
   следующие за стартовым значением.`, function () {
    it('При длинне ряда 10 и минимальном квадрате 100', function () {
        assert.equal(findRowNumbers(10, 100), '10,11,12,13,14,15,16,17,18,19');
    });
    it('При длинне ряда 1 и минимальном квадрате 1', function () {
        assert.equal(findRowNumbers(1, 1), '1');
    });
    it('При длинне ряда 1 и минимальном квадрате 25', function () {
        assert.equal(findRowNumbers(15, 25), '5,6,7,8,9,10,11,12,13,14,15,16,17,18,19');
    });
});

describe(`Числовая последовательность. Вспомогательная функция checkData.
Принимает длину ряда чисел и значение минимального квадрата. 
 Проверяет 2 параметра длина - тип число и больше 0. 
 Значение минимального квадрата - тип число и больше 0.
 Выводит при прохождении проверки true, иначе false`, function () {
     it('Проверяет 2 параметра длина - тип число', function () {
         assert.deepEqual(checkData('345', 1), {
             status: 'failed',
             reason: 'Wrong type of the arguments',
         });
     });
    it('Проверяет 2 параметра длина больше 0', function () {
        assert.deepEqual(checkData(10, -10), {
            status: 'failed',
            reason: 'Too small value of argument',
        });
    });
    it('Проверка является ли аргумент square квадратом числа', function () {
        assert.deepEqual(checkData(10, 5), {
            status: 'failed',
            reason: 'The value in arguments "minimum square" must be the square of a number.',
        });
    });
});