function checkPalindrom(num) {
    let result = checkData(num);

    if (!checkData(num)) {
        const numToStr = String(num).split('').join('|'),
            palindromsArr = [],
            numToStrLength = numToStr.length;
        let palindromItem;

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

function checkData(num) {
    let res = false;

    switch (false) {
        case (typeof num === 'number'):
            res = {
                status: 'failed',
                reason: 'Wrong type of the arguments',
            };
            break;

        case (String(num).length <= 16 &&
            String(num).length > 2) :
            res = {
                status: 'failed',
                reason: 'Too small or too big length of argument',
            };
            break;
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



console.log(checkPalindrom(5345354122145111));