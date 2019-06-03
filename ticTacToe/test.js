describe("showTicTacToeGameResult", function () {

    it("должен победить Второй", function () {
        assert.equal(showTicTacToeGameResult([
            [2, 2, 2],
            [1, 2, 1],
            [1, 2, 1]
        ]), 2);
    });
    it("должен победить Первый", function () {
        assert.equal(showTicTacToeGameResult([
            [1, 1, 2],
            [1, 2, 1],
            [1, 2, 1]
        ]), 1);
    });
    it("ничья", function () {
        assert.equal(showTicTacToeGameResult([
            [2, 1, 2],
            [1, 2, 1],
            [1, 2, 1]
        ]), 0);
    });
    it("не доиграли", function () {
        assert.equal(showTicTacToeGameResult([
            [2, 2, 2],
            [1, 0, 1],
            [1, 2, 1]
        ]), -1);
    });
});