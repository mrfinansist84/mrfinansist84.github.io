  describe('Анализ конвертов: основная функция checkEntersEnvelope', function () {
     it('определяет можно ли первый вложить во второй и выдает номер конверта который вкладываем', function () {
         assert.equal(checkEntersEnvelope({
            a: 10,
            b: 20
        }, {
            p: 20,
            q: 30
        }), 1);
     });
     it('в случае если невозможно вложить конверт один в другой выводит 0', function () {
         assert.equal(checkEntersEnvelope({
            a: 100,
            b: 5
        }, {
            p: 20,
            q: 30
        }), 0);
     });
     it('выдает номер вкладываемого конверта.В данном случае 2', function () {
         assert.equal(checkEntersEnvelope({
            a: 10,
            b: 20
        }, {
            p: 5,
            q: 5
        }), 2);
     });
 });  


 describe('Анализ конвертов: функция checkData - проверка входящих парамтров', function () {
    it('вызов функции возможен с 2 параметрами - обекты с ключами (a,b) и (p,q)', function () {
        assert.equal(checkData({
            a: 10,
            b: 20
        }, {
            p: 20,
            q: 30
        }), false);
    });
    it('свойства объектов в параметрах должны быть только тип число', function () {
        assert.deepEqual(checkData({
            a: '20',
            b: 'sdsdsd'
        }, {
            p: 20,
            q: 30
        }), {
            status: 'failed',
            reason: 'Wrong type of arguments',
        });
    });
    it('ключи первого объкта должны именоваться a,b; второго - p,q', function () {
        assert.deepEqual(checkData({
            x: 10,
            b: 20
        }, {
            p: 20,
            q: 30
        }), {
            status: 'failed',
            reason: 'Wrong type of arguments',
        });
    });
});  