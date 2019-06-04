export default function findArrNumbers(numLength = 0, square = 0) {
    if (typeof numLength === 'number' &&
        typeof square === 'number' &&
        numLength > 0 &&
        square > 0) {
        const arrNumbers = [];
        for (let number = 0; arrNumbers.length < numLength; number++) {
            if ((number * number) > square) {
                arrNumbers.push(number);
            }
        }
        return (arrNumbers.join(','));
    } else {
        return ({
            status: 'failed',
            reason: 'Input only integers as numLength and square',
        })
    }
}