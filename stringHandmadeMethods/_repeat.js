export default function _repeat(str, count) {
    let newStr = '';
    if (count) {
        for(let i = 0; i < count; i++) {
        newStr += str;
        }
    }
    return newStr;
}