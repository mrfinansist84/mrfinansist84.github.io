function checkData({ a,b }, { p,q }) {
    let res = false;
    
    if (typeof a === 'number' &&
        typeof b === 'number' &&
        typeof p === 'number' &&
        typeof q === 'number' &&
        (a>0 && b>0 && p>0 && q>0)
    ) {
        res = true;
    }
    return res;
}

function checkEntersEnvelope(envelope1, envelope2) {
    let result = {
            status: 'failed',
            reason: 'Input only 2 objects with keys (a,b) and (p,q)',
        },
        a = envelope1.a,
        b = envelope1.b,
        p = envelope2.p,
        q = envelope2.q,
        formulaEnv1 = (2 * p * q * a + (p * p - q * q) *
            Math.sqrt(p * p + q * q - a * a)) / (p * p + q * q),
        formulaEnv2 = (2 * b * a * p + (a * a - b * b) *
            Math.sqrt(a * a + b * b - p * p)) / (a * a + b * b);

    if (checkData(envelope1, envelope2)) {
        switch (true) {
            case (p >= a && q >= b) || (p > a && b >= formulaEnv1):
                result = 1;
                break;
            case (p <= a && q <= b) || (p <= a && q >= formulaEnv2):
                result = 2;
                break;
            default:
                result = 0;
        }
    }
    return result;
}

console.log(checkEntersEnvelope({
    a: 75,
    b: 4
}, {
    p: 70,
    q: 40
}));