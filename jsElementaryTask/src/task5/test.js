   describe(`Счастливые билеты. Основная функция compareCalc.
   Сравнивает количества счастливых билетов полученных при расчете 
   "Простым" и "Сложным" методами. Принимает 1 аргумент - объект с полями min(значение - строка с номером билета) 
   и max(значение - строка с номером билета) - диапазаном значений для расчета. 
   Возвращает объект с информацией о победившем методе и количестве счастливых билетов для 
   каждого способа подсчёта.`, function () {
       it('Введен диапазон номеров от 000100 до 100999. Результат победил Простой метод', function () {
           assert.deepEqual(compareCalc({
               min: '000100',
               max: '100999'
           }), {
               winner: "Простой",
               easyWay: 4842,
               hardWay: 3779
           });
       });
       it('Введен диапазон номеров от 100100 до 100199. Результат победил Сложный метод', function () {
           assert.deepEqual(compareCalc({
               min: '100100',
               max: '100199'
           }), {
               winner: "Сложный",
               easyWay: 1,
               hardWay: 2
           });
       });
   });

   describe(`Счастливые билеты.Вспомогательная функция checkData.
 Принимает объект входных аргументов(сразу деструктуризирует на переменные min и max). 
 Проверяет: 
 1)min и max на тип - оба параметра - строки;
 2)при деструктуризации проверяет что передан объект и в нем есть свойства с ключами min и max;
 3)длинна min равна шести символам;
 4)длинна max равна шести символам;
 5)min меньше либо равен max;`, function () {

       it('min, max тип - строка', function () {
           assert.deepEqual(checkData({
               min: '000100',
               max: 100999
           }), {
            status: 'failed',
            reason: 'Missed or wrong type of the arguments',
        });
       });
       it('при деструктуризации проверяет что передан объект с ключами min и max;', function () {
           assert.deepEqual(checkData('dsgfgjkj'), {
            status: 'failed',
            reason: 'Missed or wrong type of the arguments',
        });
       });
       it('при деструктуризации проверяет что передан объект с ключами min и max;', function () {
           assert.deepEqual(checkData({
               avr: '000100',
               max: '100999'
           }), {
            status: 'failed',
            reason: 'Missed or wrong type of the arguments',
        });
       });
       it('при деструктуризации проверяет что передан объект с 2 свойствами;', function () {
           assert.deepEqual(checkData({
               max: '100999'
           }), {
            status: 'failed',
            reason: 'Missed or wrong type of the arguments',
        });
       });

       it('длинна min равна шести символам', function () {
           assert.deepEqual(checkData({
               min: '0001',
               max: '100999'
           }), {
            status: 'failed',
            reason: 'Wrong length of argument (need 6 members)',
        });
       });
       it('длинна max равна шести символам', function () {
           assert.deepEqual(checkData({
               min: '000100',
               max: '1099'
           }), {
            status: 'failed',
            reason: 'Wrong length of argument (need 6 members)',
        });
       });
       it('min меньше либо равен max', function () {
           assert.deepEqual (checkData({
               min: '100100',
               max: '100000'
           }), {
            status: 'failed',
            reason: 'The maximum value must be greater than the minimum',
        });
       });
   });


   describe(`Счастливые билеты.Вспомогательная функция findLuckyTicketEasy.
   Расчитывает счастливый или нет билет Простым методом. Принимает номер билета(тип строка). 
   Возвращает 1 если счастливый, в противном случае 0.`, function () {
    it('Билет 121112 счастливый. Вернет 1', function () {
        assert.equal(findLuckyTicketEasy('121112'), 1);
    });
    it('Билет 111221 обычный. Вернет 0', function () {
     assert.equal(findLuckyTicketEasy('111221'), 0);
    });
   });

   describe(`Счастливые билеты.Вспомогательная функция findLuckyTicketHard.
   Расчитывает счастливый или нет билет Сложным методом. Принимает номер билета(тип строка). 
   Возвращает 1 если счастливый, в противном случае 0.`, function () {
       it('Билет 111221 счастливый. Вернет 1', function () {
           assert.equal(findLuckyTicketHard('111221'), 1);
       });
       it('Билет 001001 обычный. Вернет 0', function () {
        assert.equal(findLuckyTicketHard('001001'), 0);
       });
   });