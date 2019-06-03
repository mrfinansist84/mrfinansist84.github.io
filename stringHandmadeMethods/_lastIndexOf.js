export default function _lastIndexOf(searchingStr, startString) {
    let checkResult = -1,
        newStr = '';

    for (let j = startString.length; j > 0; j--) {
        for (let i = 0; i < searchingStr.length; i++) {
            newStr = startString[j - i - 1] + newStr;
        }
        if (newStr === searchingStr) {
            checkResult = j;
            break;
        } else {
            newStr = '';
        }
    }
    return checkResult;
}