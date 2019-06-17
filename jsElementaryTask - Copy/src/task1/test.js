 describe('Шахматная доска: основная функция chessBuilder для построения доски', function () {
     it('построение доски из символов @ 4 символа шириной и 5 символов в высоту', function () {
         assert.equal(chessBuilder(4, 5, '@'),
             '\n@ @ @ @  \n @ @ @ @ \n@ @ @ @  \n @ @ @ @ \n@ @ @ @  \n');
     });
 });

 describe('Шахматная доска: функция checkIncomeData проверки входных аргументов', function () {
     it('принимает 3 параметра', function () {
         assert.deepEqual(checkIncomeData(4, '@'), {
            status: 'failed',
            reason: 'Wrong value or missed some arguments: length & width > 0; symbol = 1 item',
        });
     });
     it('принимает параметр length(тип число)', function () {
         assert.deepEqual(checkIncomeData('dd2',4,'@'), {
            status: 'failed',
            reason: 'Wrong value or missed some arguments: length & width > 0; symbol = 1 item',
        });
     });
     it('принимает параметр width(тип число)', function () {
         assert.deepEqual(checkIncomeData(5,'4','@'), {
            status: 'failed',
            reason: 'Wrong type of arguments',
        });
     });
     it('принимает параметр symbol(тип строка)', function () {
         assert.deepEqual(checkIncomeData(5,3,5), {
            status: 'failed',
            reason: 'Wrong type of arguments',
        });
     });
     it('параметр length и width больше или равны 0', function () {
         assert.deepEqual(checkIncomeData(-50, 3, '@'), {
            status: 'failed',
            reason: 'Wrong value or missed some arguments: length & width > 0; symbol = 1 item',
        });
     });
 });