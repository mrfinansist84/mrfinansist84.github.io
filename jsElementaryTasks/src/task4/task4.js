function checkData(num) {
    let res = false;

    if (typeof num === 'number' &&
        String(num).length <= 16 &&
        String(num).length > 2) {
        res = true
    }
    return res;
}

function findLengthPal(str, i) {
    let leftPosition = i - 1,
        rightPosition = i + 1;

    while (str[leftPosition] === str[rightPosition] && str[leftPosition]) {
        leftPosition -= 1;
        rightPosition += 1;
    }
    return str.slice(leftPosition + 1, rightPosition);
}

function checkPalindrom(num) {
    let result = {
            status: 'failed',
            reason: 'Input only number, length until 16',
        };

    if (checkData(num)) {
        let numToStr,
        numToStrLength,
        palindromItem,
        palindromsArr = [];
        
        numToStr = String(num).split('').join('|');
        numToStrLength = numToStr.length;

        for (let i = 0; i < numToStrLength; i++) {
            palindromItem = numToStr[i - 1] === numToStr[i + 1] ?
                findLengthPal(numToStr, i) : 0;

            palindromItem.length > 3 ?
                palindromsArr.push(Number(palindromItem.split('|').join(''))) : 0;
        }

        result = palindromsArr.length !== 0 ? Math.max(...palindromsArr) : 0;
    }
    return result;
}


console.log(checkPalindrom(5345354122145111));