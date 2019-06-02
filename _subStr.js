export default function _subStr(str, startIndex, lastIndex) {
    let endIndex,
        newStr = '';

    lastIndex > str.length || lastIndex == undefined ?
        endIndex = str.length :
        endIndex = lastIndex;


    for (let i = startIndex; i < endIndex; i++) {
        newStr += str[i];
    }
    return newStr;
}