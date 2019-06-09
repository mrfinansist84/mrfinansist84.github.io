function checkData(rowLength, square) {
    let res = false;
    
    if (typeof rowLength === 'number' &&
        typeof square === 'number' &&
        rowLength > 0 &&
        square > 0) {
        res = true;
    }
    return res;
}


export default function findrowNumbers(rowLength = 0, square = 0) {
    const rowNumbers = [],
        startNumber = Math.ceil(Math.sqrt(square));
    let result = {
        status: 'failed',
        reason: 'Input only integers as numLength and square',
    };

    if (checkData(rowLength, square)) {
        for (let number = startNumber; rowNumbers.length <= rowLength; number++) {
            rowNumbers.push(number);
        }
        result = rowNumbers.join(',');
    }
    return result;
}