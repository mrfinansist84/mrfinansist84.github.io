function calculationGerona({
    a,
    b,
    c
}) {
    let p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

function sortParametrs(a, b) {
    if (a.square < b.square) {
        return 1;
    }
    if (a.square > b.square) {
        return -1;
    }
}

export default function sortTriangles(arrTriangles = []) {
    const result = [];
    let groupTriangles = arrTriangles.map(triangle => {
        return {
            square: calculationGerona(triangle),
            name: triangle.vertices,
        }
    });
    let sorted = groupTriangles.sort(sortParametrs);
    sorted.forEach((el => {
        result.push(el.name)
    }));
    return result;
}