export default function checkPalindrom(number) {
    if (typeof number === 'number') {
        /* const result = []; */

        let newStNum = String(number).split('').reverse().join('');
        let analogy = String(number).indexOf()
    /*     let revArr = [...arr].reverse(); */
        /* for (let i = 0; i < arr.length; i++) {
           
            if (+arr[i] === +revArr[i] && +arr[i+1] === +revArr[i+1]) {
                result.push(+arr[i], +arr[i+1]);
                i += 1;
                console.log(result);
            }
        } */
        /* arr.forEach((num, i) => {
            if (+num[i] === +revArr[i] 
                && +num[i+1] === +revArr[i+1]) {
                result.push(+num[i], +num[i+1]);
                i += 1;
            }
        }) */

        if (result < 10) {
            return 'This number isn`t palindrom';
        }
        if (result.length < 2) {
            return 'This number isn`t palindrom';
        } else console.log(result);
    } else {
        return {
            status: 'failed',
            reason: 'Input only one number',
        }
    }
}