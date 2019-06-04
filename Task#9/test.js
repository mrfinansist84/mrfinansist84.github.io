describe("getNumberFromSequence", function () {

    it("должны быть показанные первые числа 3 последовательностей", function () {
        assert.deepEqual(getNumberFromSequence(3, ['fib', 'pad', 'tri']), [0, 1, 0]);
    });
    it("должны быть показанные первые числа 20 последовательностей количество паттерна увеличино под n", function () {
        assert.equal((getNumberFromSequence(20, ['fib', 'pad', 'tri']).join()),
            ([0, 1, 0, 1, 0, 0, 1, 0, 1, 2, 1, 1, 3, 0, 2, 5, 1, 4, 8, 1]).join());
    });
    it("должны быть показанные первые числа 3 последовательностей при этом число n увеличивается под необходимую длинну", function () {
        assert.equal((getNumberFromSequence(3, ['fib', 'pad', 'tri', 'fib', 'pad', 'tri', 'fib', 'pad', 'tri', 'fib', 'pad', 'tri']).join()),
            ([0, 1, 0, 1, 0, 0, 1, 0, 1, 2, 1, 1]).join());
    });

    it("должны быть показанные первые числа других 3 последовательностей", function () {
        assert.equal((getNumberFromSequence(3, ['jac', 'pad', 'tet']).join()), ([0, 1, 0]).join())
    });
});