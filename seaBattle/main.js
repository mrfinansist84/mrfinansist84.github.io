const createArrOfShips = function (board) {
    const arrOfShips = [];

    board.forEach((row, i) => {
        row.forEach(elInRow => {
            if (elInRow) {
                arrOfShips[elInRow - 1] = arrOfShips[elInRow - 1] ?
                    arrOfShips[elInRow - 1] + 1 : 1;
            }
        });
    });
    return arrOfShips;
}

const findHitandMuffPoints = function (board, attacks, arrOfShips) {
    const arrOfShipsUnderAttack = arrOfShips,
        result = {
            sunk: 0,
            damaged: 0,
            notTouched: 0,
            points: 0
        },
        POINTS_FOR_HIT = 0.5,
        POINTS_FOR_MISSED = -1,
        POINTS_FOR_SANK = 1;

    board.reverse();
    board.forEach((row, i) => {
        attacks.forEach((shut, j) => {
            if (i === shut[1] - 1) {

                if (row[shut[0] - 1]) {
                    arrOfShipsUnderAttack[row[shut[0] - 1] - 1] = arrOfShipsUnderAttack[row[shut[0] - 1] - 1] - 1;

                    if (arrOfShipsUnderAttack.length === arrOfShipsUnderAttack.filter(el => el !== 0).length) {
                        result.points += POINTS_FOR_HIT;
                        result.damaged += 1;
                    } else {
                        result.points += POINTS_FOR_SANK;
                        result.sunk += 1;
                    }
                } else {
                    result.points += POINTS_FOR_MISSED;
                }
            }
        })
    })
    return result;
}


const damagedOrSunk = function (board, attacks) {
    let arrOfShips;

    arrOfShips = createArrOfShips(board);
    return findHitandMuffPoints(board, attacks, arrOfShips);
}

board = [
    [0, 0, 0, 2, 4, 0],
    [0, 3, 0, 0, 0, 0],
    [0, 3, 0, 1, 0, 0],
    [0, 3, 0, 1, 0, 0]
];
attacks = [
    [2, 1],
    [5, 4],
    [4, 2],
    [4, 3],
    [3, 1],
    [4, 4],
    [4, 1],
];
damagedOrSunk(board, attacks);