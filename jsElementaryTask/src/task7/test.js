   describe(`Ряд Фибоначчи для диапазона. Основная функция buildFibonacciRow.
   Инициализирует проверку аргументов, в случае успешной проверки примает результат 
   расчета массива чисел Фибоначчи и выводит результат.
   Принимает 1 аргумент - объект с со свойсвом length либо свойствами min, max. 
   Выводит массив чисел, либо объект ошибки при некорректных параметрах`, function () {
       it('Введен диапазон от 0 до 11', function () {
           assert.deepEqual(buildFibonacciRow({
               min: 0,
               max: 11,
           }), [0, 1, 1, 2, 3, 5, 8]);
       });
       it('Введена длина 10', function () {
           assert.deepEqual(buildFibonacciRow({
               length: 10
           }), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
       });
       it('Введен диапазон от 100 до 1000', function () {
           assert.deepEqual(buildFibonacciRow({
               min: 100,
               max: 1000,
           }), [144, 233, 377, 610, 987]);
       });
   });

   describe(`Ряд Фибоначчи для диапазона. Вспомогательная функция checkData.
 Принимает 1 аргумент - объект, со свойсвом length либо свойствами min, max.
 Выводит true если прошла проверка иначе false.
  Проверка аргументов на:
  1) Ввиду некорректного названия проверяем чтобы аргумент
  не был ни массивом, ни строкой, у которых есть встроенные свойства length;
  2) Если передан объект со свойством length:
  2.1) тип значения свойства - число;
  2.2) значение больше или равно 0.
  3) Если передан диапазон:
  3.1) переданы оба свойства min, max. И тип значений свойств - число;
  3.2) значение min больше либо равно 0;
  3.3) значение max больше 0;
  3.4) начало диапазона меньше максимального значения(опционно)`, function () {
       it('Проверка на то, что аргумент не массив', function () {
           assert.deepEqual(checkData([345, 435]), {
               status: 'failed',
               reason: 'Not object passed to the arguments',
           });
       });
       it('Проверка на то, что аргумент не строка', function () {
           assert.deepEqual(checkData('gdfdfgdf'), {
               status: 'failed',
               reason: 'Not object passed to the arguments',
           });
       });
       it('Проверка при св-ве length. Тип значения свойства - число', function () {
           assert.deepEqual(checkData({
               length: '10'
           }), {
               status: 'failed',
               reason: 'Wrong type of the arguments',
           });
       });
       it('Проверка при св-ве length. Значение больше или равно 0', function () {
           assert.deepEqual(checkData({
               length: -10
           }), {
               status: 'failed',
               reason: 'Value of arguments must be longer 0',
           });
       });
       it('Проверка при св-вах min, max. Переданы оба свойства с типом значений-число', function () {
           assert.deepEqual(checkData({
               min: 'dfsdf',
               max: 11,
           }), {
               status: 'failed',
               reason: 'Wrong type of the arguments',
           });
       });
       it('Проверка при св-вах min, max. Значение min больше либо равно 0', function () {
           assert.deepEqual(checkData({
               min: -10,
               max: 11,
           }), {
               status: 'failed',
               reason: 'Value of arguments must be longer 0',
           });
       });
       it('Проверка при св-вах min, max. Значение max больше 0', function () {
           assert.deepEqual(checkData({
               min: -10,
               max: 0,
           }), {
               status: 'failed',
               reason: 'Value of arguments must be longer 0',
           });
       });
       it('Проверка при св-вах min, max. Начало диапазона должно быть меньше максимального значения', function () {
           assert.deepEqual(checkData({
               min: 100,
               max: 10,
           }), {
               status: 'failed',
               reason: 'The maximum value must be greater than the minimum',
           });
       });
   });

   describe(`Ряд Фибоначчи для диапазона. Вспомагательная функция calcFibonacci.
   Инициализирует функции для расчета чисел Фибоначчи по заданным параметрам. 
   Принимает 1 аргумент - объект со свойсвом length либо свойствами min, max.
   Выводит массив чисел Фибоначчи.`, function () {
       it('Введен диапазон от 0 до 11', function () {
           assert.deepEqual(buildFibonacciRow({
               min: 0,
               max: 11,
           }), [0, 1, 1, 2, 3, 5, 8]);
       });
       it('Введена длина 10', function () {
           assert.deepEqual(buildFibonacciRow({
               length: 10
           }), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
       });
       it('Введен диапазон от 100 до 1000', function () {
           assert.deepEqual(buildFibonacciRow({
               min: 100,
               max: 1000,
           }), [144, 233, 377, 610, 987]);
       });
   });

   describe(`Ряд Фибоначчи для диапазона. Вспомагательная функция calcFibWithLength.
   Расчет массива чисел Фибоначчи заданной длинны. Принимает 1 параметр - длинну массива(тип число).
   Выводит массив чисел.`, function () {
       it('Длинна массива 5', function () {
           assert.deepEqual(calcFibWithLength(5), [0, 1, 1, 2, 3]);
       });
       it('Введена длина 10', function () {
           assert.deepEqual(calcFibWithLength(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
       });
   });

   describe(`Ряд Фибоначчи для диапазона. Вспомагательная функция calcFibForRange.
   Расчет чисела Фибоначчи по заданной позиции. Принимает 1 параметр - позиция числа в ряду Фибоначчи(тип число).
   Выводит число. `, function () {
       it('введена позиция 1. Это соответствует 0 в ряде Фибоначчи', function () {
           assert.equal(calcFibForRange(0), 0);
       });
       it('введена позиция 10 это соответствует числу 55 в ряде Фибоначчи', function () {
           assert.equal(calcFibForRange(10), 55);
       });
   });