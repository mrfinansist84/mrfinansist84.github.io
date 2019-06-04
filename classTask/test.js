let curr = 'UAH';

describe("toData", function () {
    it(`Является вспомогательным для метода calcSummFromRows
    принимает строку, удаляет пробелы, заменяет ',' на '.',
         и выводит число.`, function () {
        assert.equal(NumC.toData('  3,54654 '), 3.54654);
    });
    it(`Возвращает число`, function () {
        assert.isNotNaN(NumC.toData('  3,54654 '));
    });
});

describe("toBuh", function () {
    it(`Преобразует из числа в строку.
    принимает сумма(тип число), насколько округлять после запятой(тип число) 
    и валюту(тип строка), проверяет на сумму по типу на возможность преобразовать в 
    число, если прошла проверка то запускает метод convertToBuh и 
    возвращает строку в формате "число+валюта"`, function () {
        assert.equal(NumC.toBuh(3.54654, 2, 'UAH'), '3,547 UAH');
    });
    it(`если не прошла проверка - вернет входные данные.`, function () {
        assert.equal(NumC.toBuh('54fgd', 2, 'UAH'), '54fgd');
    });
});

describe("convertToBuh", function () {
    it(`Является вспомогательным для метода toBuh.
    принимает сумму(тип число), значение - насколько округлять после запятой(тип число) 
    и валюту(тип строка) округляет число до указанной длинны и выводит стоку
    в формате "число+валюта".`, function () {
        assert.equal(NumC.convertToBuh('3.334', 2, 'UAH'), '3.334 UAH');
    });
});

describe("isNumeric", function () {
    it(`Является вспомогательным для метода toBuh. 
    принимает строку содерщащую сумму и проверяет можно ли ее преобразовать в 
     число возвращает булевое значение.`, function () {
        assert.isTrue(NumC.isNumeric('3.54654'));
    });
});

describe("toSymbol", function () {
    it(`Переключает обозначение валют.
    принимает параметр валюта (тип строка) возвращает 
    символьное обозначение соответствующей валюты(тип строка)`, function () {
        assert.equal(NumC.toSymbol('EUR'), '€');
    });
});

describe("toCurrency", function () {
    it(`Переключает обозначение валют.
    принимает параметр символьное обозначение валюты(тип строка)
    возвращает буквенное обозначение валюты(тип строка)`, function () {
        assert.equal(NumC.toCurrency('€'), 'EUR');
    });
    it(`Возвращает строку`, function () {
        assert.isString(NumC.toCurrency('€'));
    });
});

describe("calcSummFromRows", function () {
    it(`Функция сложения. 
    Принимает ссылку на документ откуда брать данные. Преобразует с помощью вспомогательного 
    метода toData входящие данные к числам, и суммирует их. Выводит полученный результат(тип число)`, function () {
        assert.equal(NumC.calcSummFromRows(a, '.sum'), 14.3783283);
    });
});

describe("getFALDates", function () {
    it(`Форматирует дату.
    Принимает ссылку на документ откуда брать массив дат. Выбирает первую и послуднюю дату. Преобразует под требуемый формат.
    Возвращает обект с ключами last/first и значениями - даты в виде строки`, function () {
        assert.deepEqual(NumC.getFALDates(a, '.date'), {last: '2018-01-02', first: '2019-11-07'});
    });
    it(`Возвращает объект`, function () {
        assert.isObject(NumC.getFALDates(a, '.date'));
    });
});

describe("проверка аргументов", function () {
    it(`длинна должна быть 3`, function () {
        assert.lengthOf((curr),3);
    });
    it(`аргумент - строка`, function () {
        assert.isString(curr);
    });
    it(`аргумент - не число и не может быть к нему преобразован`, function () {
        assert.isNaN(curr);
    });
});