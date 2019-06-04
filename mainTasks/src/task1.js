function checkIncomeData(length, width, symbol) {
    let result = false;

    if (typeof length === 'number' &&
        typeof width === 'number' &&
        typeof symbol === 'string' &&
        symbol.length === 1 &&
        length >= 0 && width >= 0) {
        result = true;
    }
    return result;
}

export default function chessBuilder(length = 0, width = 0, symbol = '*') {
    const symbolWithWhitespace = `${symbol} `;
    let result = `\n`;
debugger
    if (checkIncomeData(length,width,symbol)) {
        for (let i = 0; i < length; i++) {
            if (i % 2 == 0) {
                result += `${symbolWithWhitespace.repeat(width)} \n`;
            }
            if (i % 2 == 1) {
                result += ` ${symbolWithWhitespace.repeat(width)} \n`;
            }
        }
    } else {
        result = {
            status: 'failed',
            reason: 'Input only numbers as length and width; symbol - one symbol string',
        };
    }
    return result;
}