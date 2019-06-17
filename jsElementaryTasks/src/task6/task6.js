function findRowNumbers(rowLength, square) {
    let result = checkData(rowLength, square);

    if (!checkData(rowLength, square)) {
        const rowNumbers = [];
        let startNumber = Math.sqrt(square);

        for (startNumber; rowNumbers.length < rowLength; startNumber++) {
            rowNumbers.push(startNumber);
        }
        result = rowNumbers.join(',');
    }

    return result;
}

function checkData(rowLength, square) {
    let res = false;

    switch (false) {
        case (typeof rowLength === 'number' &&
            typeof square === 'number'):
            res = {
                status: 'failed',
                reason: 'Wrong type of the arguments',
            };
            break;
        case (rowLength > 0 && square > 0):
            res = {
                status: 'failed',
                reason: 'Too small value of argument',
            };
            break;
        case (Number.isInteger(Math.sqrt(square))):
            res = {
                status: 'failed',
                reason: 'The value in arguments "minimum square" must be the square of a number.',
            };
            break;
    }

    return res;
}

console.log(findRowNumbers(3, 25));