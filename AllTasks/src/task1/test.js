 describe('Шахматная доска: основная функция chessBuilder для построения доски', function () {
     it('построение доски из символов @ 4 символа шириной и 5 символов в высоту', function () {
         assert.equal(chessBuilder(4, 5, '@'),
             '\n@ @ @ @ @  \n @ @ @ @ @ \n@ @ @ @ @  \n @ @ @ @ @ \n');
     });
 });

 describe('Шахматная доска: функция checkIncomeData проверки входных аргументов', function () {
     it('принимает 3 параметра', function () {
         assert.equal(checkIncomeData(4, '@'), false);
     });
     it('принимает параметр length(тип число)', function () {
         assert.equal(checkIncomeData('dd2',4,'@'), false);
     });
     it('принимает параметр width(тип число)', function () {
         assert.equal(checkIncomeData(5,'4','@'), false);
     });
     it('принимает параметр symbol(тип строка)', function () {
         assert.equal(checkIncomeData(5,3,5), false);
     });
     it('параметр symbol длинной в 1 символ', function () {
         assert.equal(checkIncomeData(5,4,'@@@@'), false);
     });
     it('параметр length и width больше или равны 0', function () {
         assert.equal(checkIncomeData(-50, 3, '@'), false);
     });
 });