function calcMulti(membersOfn) {
    return membersOfn.reduce((acc, cur) => acc * cur);
}


function calcPat(n) {
    let difference,
        membersOfn = [],
        arrAllVariables = [],
        cycleDuration = Math.floor(n / 2),
        lengthArr = 3,
        index = 0,
        membersOfnum;

    for (index = 0; index < cycleDuration; index++) {
        difference = n - index;

        index > 0 ?
            membersOfn.push(difference, index) :
            membersOfn.push(difference);

        arrAllVariables.push({
            arr: membersOfn,
            multiMembers: calcMulti(membersOfn)
        });

        if (index !== 0 && difference - index !== 0) {
            while (difference > index) {
                membersOfnum = new Array(lengthArr);
                membersOfnum[0] = difference - index;
                membersOfnum.fill(index, 1, lengthArr);
                lengthArr++;
                difference -= index;
                arrAllVariables.push({
                    arr: membersOfnum,
                    multiMembers: calcMulti(membersOfnum)
                });
                membersOfnum = [];
            }
            lengthArr = 3;
        }
        membersOfn = [];
    }
    return Object.values(arrAllVariables.sort((a, b) => b.multiMembers - a.multiMembers)[0]);
}

console.log(calcPat(8));
/* 
how3 = (n/3) parseInt;
how2=n%3;

if (how2 ==1) {
    how3--;
    how2 =4;
    push() || shift()
} */