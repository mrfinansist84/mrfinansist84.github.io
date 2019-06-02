/* export default function _trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
} */



export default function _trim(str) {
    let whitespace = ' ',
        i, j;

    for (i = 0; i < str.length && str[i] == whitespace; i++);
    for (j = str.length - 1; j > i && str[j] == whitespace; j--);
    
    return str.substr(i, j - i + 1);
}