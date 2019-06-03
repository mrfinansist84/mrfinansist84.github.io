export default function _split(str, separator) {
    const resultArrWithSubstrings = [];
    let newStr = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === separator) {
            resultArrWithSubstrings.push(newStr);
            newStr = '';
            continue;
        }
        newStr += str[i];
    }
    resultArrWithSubstrings.push(newStr);
    return resultArrWithSubstrings;
}