/* @~@@*@@ */
function convertExpToNum(expression) {
    return expression
        .replace(/@/g, 1)
        .replace(/~~/g, 0)
        .replace(/0(~)/g, '00');
}

function sumMembers(el) {
    let acc = 0,
        modEl = el,
        resSum = '';
        
    if (modEl != 0 ) {
        while (modEl > 0) {
            let curr = modEl % 10;

            if (curr !=0) {
                acc += curr;
            } else {
                resSum = '0' + acc +  resSum;
                acc = 0;
            }
            modEl = Math.floor(modEl / 10)
        }
        resSum = acc + resSum;
    } else {
        resSum = el;
    } 
    return resSum;
}

function calcLikeIncas(expression) {
    let expToNum,
        arrNum;

    expToNum = convertExpToNum(expression);
    arrNum = expToNum.split('~');
    let newarrNum = arrNum.map((el) => {
        return sumMembers(el);
    })
    
    console.log(newarrNum.join(''))
}

calcLikeIncas('@@@~~@~@@@~~@+@@@~~@');