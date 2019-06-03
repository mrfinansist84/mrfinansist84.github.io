export default function toUC(str, language) {

    const ru = {
            numberOfCharacters: 32,
            startNumberLittleLetter: 1072
        },
        en = {
            numberOfCharacters: 32,
            startNumberLittleLetter: 97
        };

    let languageSwitch;

    switch (language) {
        case 'ru':
            languageSwitch = ru;
            break;
        case 'en':
            languageSwitch = en;
            break;
        default:
            languageSwitch = en;
    }

    let str1 = '';
    for (let i = 0; i < str.length; i++) {
        str.charCodeAt(i) > languageSwitch.startNumberLittleLetter - 1 ?
            str1 += String.fromCharCode(str.charCodeAt(i) - languageSwitch.numberOfCharacters) :
            str1 += str[i]
    }
    return str1;
}

 

