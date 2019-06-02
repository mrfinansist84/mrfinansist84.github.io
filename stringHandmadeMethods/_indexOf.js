export default function _indexOf(searchingStr, startString) {
    let checkResult = -1,
    newStr = '';

    for (let j = 0; j < startString.length; j++) {
        for (let i = 0; i < searchingStr.length; i++) {
            newStr += startString[j + i];
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