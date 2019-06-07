function convertExpToNum(expression) {
    return expression
        .replace(/@@@@@@@@@/g, 9)
        .replace(/@@@@@@@@/g, 8)
        .replace(/@@@@@@@/g, 7)
        .replace(/@@@@@@/g, 6)
        .replace(/@@@@@/g, 5)
        .replace(/@@@@/g, 4)
        .replace(/@@@/g, 3)
        .replace(/@@/g, 2)
        .replace(/@/g, 1)
        .replace(/~~/g, 0)
        .replace(/0(~)/g, '00')
        .replace(/~/g, '');
}

function convertNumtoExp(expression) {
    return expression
        .replace(/9/g, '@@@@@@@@@)')
        .replace(/8/g, '@@@@@@@@)')
        .replace(/7/g, '@@@@@@@')
        .replace(/6/g, '@@@@@@')
        .replace(/5/g, '@@@@@')
        .replace(/4/g, '@@@@')
        .replace(/3/g, '@@@')
        .replace(/2/g, '@@')
        .replace(/1/g, '@')
        .replace(/0/g, '~~')
        .replace(/\d(\d)/g, '~');
        
}

function calcLikeIncas(expression) {
    let expToNum,
        arrNum,
        members,
        sign,
        sum,
        NumToExp;

    expToNum = convertExpToNum(expression);

    members = expToNum.match(/\d+~?\d+/g);
    sign = expToNum.match(/[\+\-\*\/]/g);

    if (sign == '+') {
        sum = +members[0] + +members[1];
    }
    if (sign == '-') {
        sum = +members[0] - +members[1];
    }
    if (sign == '/') {
        sum = +members[0] / +members[1];
    }
    if (sign == '*') {
        sum = +members[0] * +members[1];
    }
    
    return NumToExp = convertNumtoExp(String(sum));
}
console.log(calcLikeIncas('@@@~~@~@@@~~@+@@@~~@'));