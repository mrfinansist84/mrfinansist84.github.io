export default function _includes(searchingStr, startString) {
    let newStr = '';
    let checkResult = false;
     
    if (searchingStr.length > startString.length) {
        checkResult = false;
    } else {
        for (let j = 0; j < startString.length; j++) {
            for (let i = 0; i < searchingStr.length; i++) {
                newStr += startString[j+i];
            }
            if (newStr === searchingStr) {
                checkResult = true;
                break;
            } else {
                newStr = '';
            }
        }
    }
    return checkResult;
}

/* export default function _includes(searchingStr, startString) {
    return startString.indexOf(searchingStr) !== -1;
} */