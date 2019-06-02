export default function toLC(str) {
        let strNew = '';
        for (let i = 0; i < str.length; i++) {
            str.charCodeAt(i) < 97 ?
                strNew += String.fromCharCode(str.charCodeAt(i) + 32) :
                strNew += str[i]
        }
        return strNew;
    }

    

    