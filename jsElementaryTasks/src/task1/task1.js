function chessBuilder(length, width, symbol) {
    let result = `\n`;

    if (!checkIncomeData(length, width, symbol)) {
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
        result = checkIncomeData(length, width, symbol);
    }

    return result;
}

function checkIncomeData(length = 0, width = 0, symbol = '') {
    let res = false;

    switch (false) {
        case (length > 0 && width > 0 &&
            length && width && symbol):

            res = {
                status: 'failed',
                reason: 'Wrong value or missed some arguments: length & width > 0; symbol = 1 item',
            };
            break;

        case (typeof length === 'number' &&
            typeof width === 'number' &&
            typeof symbol === 'string'):

            res = {
                status: 'failed',
                reason: 'Wrong type of arguments',
            };
            break;

    }
    return res;
}


console.log(chessBuilder(4, 4, '@'));