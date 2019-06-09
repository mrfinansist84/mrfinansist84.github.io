function checkData(num) {
    let res = false;

    if (typeof num === 'number' &&
        String(num).length <= 16) {
        res = true
    }
    return res;
}

function findLengthPal(str, leftIndex, rightIndex) {
    let leftPosition = leftIndex,
        rightPosition = rightIndex;

    while (str[leftPosition] === str[rightPosition] && str[leftPosition]) {
        leftPosition -= 1;
        rightPosition += 1;
    }
    return str.slice(leftPosition + 1, rightPosition);
}

export default function checkPalindrom(num) {
    let numToStr,
        numToStrLength,
        palindromItem,
        palindromsArr = [],
        result = {
            status: 'failed',
            reason: 'Input only number, length until 16',
        };

    if (checkData(num)) {
        numToStr = String(num).split('').join('|');
        numToStrLength = numToStr.length;

        for (let i = 0; i < numToStrLength; i++) {
            palindromItem = numToStr[i - 1] === numToStr[i + 1] ?
                findLengthPal(numToStr, i - 1, i + 1) : 0;

            palindromItem.length > 3 ?
                palindromsArr.push(Number(palindromItem.split('|').join(''))) : 0;
        }
      
        result = Math.max(...palindromsArr);
    }
    return result;
}