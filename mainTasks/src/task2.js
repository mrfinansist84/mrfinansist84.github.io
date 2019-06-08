export default function putEnvelope(envelope1 = {}, envelope2 = {}) {
    let a = envelope1.a,
        b = envelope1.b,
        p = envelope2.p,
        q = envelope2.q,
        result;
        
    switch (true) {
        case (p <= a && q <= b):
            result = 'envelope1';
            break;
        case (p >= a && q >= b):
            result = 'envelope2';
            break;
        case ((p < b &&
            a <= formula)):
            result = 'envelope1';
            break;
        case ( (p > b &&
            a >= formula)):
            result = 'envelope2';
            break;
        default:
            result = 0;
    }
    return result;
}