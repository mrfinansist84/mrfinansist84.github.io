export default function putEnvelope(envelope1 = {}, envelope2 = {}) {
    if (envelope1.a > envelope2.c &&
        envelope1.b > envelope2.d) {
        return 'envelope1';
    } else if (envelope1.a < envelope2.c &&
        envelope1.b < envelope2.d) {
        return 'envelope2';
    } else {
        return '0';
    }
}
