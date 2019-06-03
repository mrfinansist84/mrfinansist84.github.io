export default function _subStr(str, startIndex, lastIndex) {
    let endIndex,
        beginningIndex,
        newStr = '';

    lastIndex > str.length || lastIndex == undefined ?
        endIndex = str.length :
        endIndex = lastIndex;

    if (startIndex < 0) {
        beginningIndex = str.length - 1 + startIndex
        endIndex = beginningIndex + lastIndex < str.length ?
            beginningIndex + lastIndex :
            str.length;
    } else {
        beginningIndex = startIndex;
    }

    for (let i = beginningIndex; i < endIndex; i++) {
        newStr += str[i];

    }
    return newStr;
}