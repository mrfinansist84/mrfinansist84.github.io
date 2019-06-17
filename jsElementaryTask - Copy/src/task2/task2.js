export default function checkEntersEnvelope(envelope1, envelope2) {
    let result = checkData(envelope1, envelope2);

    if (!checkData(envelope1, envelope2)) {
        let a = envelope1.a,
            b = envelope1.b,
            p = envelope2.p,
            q = envelope2.q,
            bufferSide,
            formulaEnv1 = (2 * p * q * a + (p * p - q * q) *
                Math.sqrt(p * p + q * q - a * a)) / (p * p + q * q),

            formulaEnv2 = (2 * b * a * p + (a * a - b * b) *
                Math.sqrt(a * a + b * b - p * p)) / (a * a + b * b);

        if (a > b) {
            bufferSide = a;
            a = b;
            b = bufferSide;
        }

        if (p > q) {
            bufferSide = p;
            p = q;
            q = bufferSide;
        }

        switch (true) {
            case (p >= a && q >= b) || (p >= a && b >= formulaEnv1):
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

function checkData({ a, b }, { p, q }) {
    let res = false;

    switch (false) {
        case (typeof a === 'number' &&
            typeof b === 'number' &&
            typeof p === 'number' &&
            typeof q === 'number'):
            res = {
                status: 'failed',
                reason: 'Wrong type of arguments',
            };
            break;

        case (a > 0 && b > 0 && p > 0 && q > 0):
            res = {
                status: 'failed',
                reason: 'Too small value of argument',
            };
            break;
    }

    return res;
}