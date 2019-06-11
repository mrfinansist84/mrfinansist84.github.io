function checkData(rowLength, square) {
    let res = false;

    if (typeof rowLength === 'number' &&
        typeof square === 'number' &&
        rowLength > 0 &&
        square > 0 &&
        Number.isInteger(Math.sqrt(square))) {
        res = true;
    }
    return res;
}


function findRowNumbers(rowLength, square) {
    let result = {
            status: 'failed',
            reason: 'Input only integers as numLength and square',
        };

        if (checkData(rowLength, square)) {
            const rowNumbers = [];
            let startNumber = Math.sqrt(square);

            for (startNumber; rowNumbers.length < rowLength; startNumber++) {
                rowNumbers.push(startNumber);
            }
            result = rowNumbers.join(',');
        }
    return result;
}

console.log(findRowNumbers(3, 25));