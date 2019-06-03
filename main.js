function fibonacci(n) {
    let fibonacci = [0, 1];
    for (i = 2; i < n; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }
    return fibonacci.slice(0, n);
}

function padovan(n) {
    let padovan = [1, 0, 0];
    for (i = 3; i < n; i++) {
        padovan[i] = padovan[i - 2] + padovan[i - 3];
    }
    return padovan.slice(0, n);

}

function jacobsthal(n) {
    let jacobsthal = [0, 1];
    for (i = 2; i < n; i++) {
        jacobsthal[i] = jacobsthal[i - 1] + 2 * jacobsthal[i - 2];
    }
    return jacobsthal.slice(0, n);
}

function pell(n) {
    let pell = [0, 1];
    for (i = 2; i < n; i++) {
        pell[i] = 2 * pell[i - 1] + pell[i - 2];
    }
    return pell.slice(0, n);
}

function tribonacci(n) {
    let tribonacci = [0, 0, 1];
    for (i = 3; i < n; i++) {
        tribonacci[i] = tribonacci[i - 1] + tribonacci[i - 2] + tribonacci[i - 3];
    }
    return tribonacci.slice(0, n);
}

function tetranacci(n) {
    let tetranacci = [0, 0, 0, 1];
    for (i = 4; i < n; i++) {
        tetranacci[i] = tetranacci[i - 1] + tetranacci[i - 2] + tetranacci[i - 3] + tetranacci[i - 4];
    }
    return tetranacci.slice(0, n);
}

function getNumberFromSequence(n, pattern) {
    let patternOrderLength = pattern,
        result,
        mapping;

    if (n > pattern.length) {
        let count = Math.ceil(n / pattern.length);
        for (let i = 0; i < count; i++) {
            patternOrderLength = patternOrderLength.concat(pattern);
        }
        patternOrderLength.splice(n);
    } else n = pattern.length;


    mapping = new Map([
        ['fib', fibonacci(n)],
        ['pad', padovan(n)],
        ['jac', jacobsthal(n)],
        ['pel', pell(n)],
        ['tri', tribonacci(n)],
        ['tet', tetranacci(n)]
    ]);



    result = patternOrderLength.map((num, i) => {
        return mapping.get(num)[i];
    })
    return result;
}
console.log(getNumberFromSequence(20, ['fib', 'pad', 'pel', 'pel', 'pel', 'tri']));