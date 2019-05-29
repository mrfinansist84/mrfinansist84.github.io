const findWinner = function (battle) {

    let sum,
        res = 0,
        winX = 1,
        winO = 2,
        termWinnerX = 3,
        termWinnerO = 6;

    sum = battle.reduce((acc, cur) => {
        return acc + cur
    });

    if (sum === termWinnerX) {
        res = winX;
    }
    if (sum === termWinnerO) {
        res = winO;
    }
    return res;
}


const showTicTacToeGameResult = function (boardWithResult) {
    let emptySlots = -1,
        result = 0,
        /*ничья по умолччанью -1 проверка */
        variablesAll,
        variables = boardWithResult,
        ver1 = [],
        ver2 = [],
        ver3 = [],
        diag1 = [],
        diag2 = [];

    variables.forEach(el => {
        if (el.some(el => el === 0)) {
            result = emptySlots;
        }
    })


    if (result > -1) {
        variables.forEach((el, i) => {
            ver1.push(el[0]);
            ver2.push(el[1]);
            ver3.push(el[2]);
            diag1.push(el[i]);
            diag2.push(el[((i - 2) * -1)]);

        })
    }

    variablesAll = [variables[0], variables[1], variables[2], ver1, ver2, ver3, diag1, diag2];

    variablesAll.forEach((el) => {
        if (result === 0) {
            result = findWinner(el);
        }
    })

    return result;
};

showTicTacToeGameResult([
    [2, 1, 2],
    [1, 2, 1],
    [1, 2, 1]
]);