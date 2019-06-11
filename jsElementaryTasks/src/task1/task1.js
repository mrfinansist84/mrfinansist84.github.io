function checkIncomeData(length, width, symbol) {
    let res = false;

    if (typeof length === 'number' &&
        typeof width === 'number' &&
        typeof symbol === 'string' &&
        symbol.length === 1 &&
        length > 0 && width > 0 &&
        length && width && symbol) {
        res = true;
    }
    return res;
}

function chessBuilder(length, width, symbol) {
    let result = `\n`;
    
    if (checkIncomeData(length, width, symbol)) {
        const targetString = `${symbol} `.repeat(length);

        for (let i = 0; i < width; i++) {
            if (i % 2 == 0) {
                result += `${targetString} \n`;
            }
            if (i % 2 == 1) {
                result += ` ${targetString}\n`;
            }
        }
    } else {
        result = {
            status: 'failed',
            reason: 'Input only numbers as length and width; symbol - one symbol string.',
        };
    }
    return result;
}

console.log(chessBuilder(5, 5, '@'));