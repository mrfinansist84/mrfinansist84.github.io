function calculationGerona([name, a, b, c]) {
    let p = (a + b + c) / 2;

    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

function buildObjectsWithTriangles(arrTriangles) {
    return arrTriangles.map(triangle => {
        return {
            square: calculationGerona(Object.values(triangle)),
            name: triangle.vertices,
        }
    });
}

export default function sortTriangles(arrTriangles = []) {
    const result = [],
        groupTriangles = buildObjectsWithTriangles(arrTriangles);

    groupTriangles
        .sort((a, b) => b.square - a.square)
        .forEach((el => {
            result.push(el.name)
        }));
    return result;
}