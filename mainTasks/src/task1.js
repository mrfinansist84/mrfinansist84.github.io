export default function chessBuilder(length = 0, width = 0, symbol = '*') {
    if (typeof length === 'number' &&
        typeof width === 'number' &&
        typeof symbol === 'string' &&
        symbol.length === 1
    ) {
        const oddRow = [];
        const evenRow = [];
        let result = ``;

        for (let i = 0; i < width; i++) {
            oddRow.push(symbol + ' ');
            evenRow.push(' ' + symbol);
        }
        for (let i = 0; i < length; i++) {
            if (i % 2 == 0) {
                result = result.concat(oddRow.join(' '), '\n');
            }
            if (i % 2 == 1) {
                result = result.concat(evenRow.join(' '), '\n');
            }
        }
        return result;
    } else {
        return ({
            status: 'failed',
            reason: 'Input only numbers as length and width; symbol - one length string',
        })
    }
}