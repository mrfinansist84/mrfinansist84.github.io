function checkData(arrTriangles) {
    let res = false,
        argValue,
        argKeys,
        a, b, c;

    if (Array.isArray(arrTriangles) &&
        arrTriangles.length > 0) {

        arrTriangles.forEach((triangle) => {
            argValue = Object.values(triangle);
            argKeys = Object.keys(triangle);
            a = argValue[1];
            b = argValue[2];
            c = argValue[3];

            if (typeof argValue[0] === 'string' &&
                argValue[0].length === 3 &&
                typeof a === 'number' &&
                typeof b === 'number' &&
                typeof c === 'number' &&
                (a > 0 && b > 0 && c > 0) &&
                ((a + b > c) && (a + c > b) && (b + c > a))) {
                res = true;

            } else {
                res = false;
            }
        });
    }
    return res;
}

function calcSquareGerona([name, a, b, c]) {
    let p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

function buildObjectsWithTriangles(arrTriangles) {
    return arrTriangles.map(triangle => {
        return {
            square: calcSquareGerona(Object.values(triangle)),
            name: triangle.vertices,
        }
    });
}

function sortTriangles(arrTriangles) {
    let result = {
        status: 'failed',
        reason: 'Input only 2 objects with keys vertices, side 1,2,3',
    };

    if (checkData(arrTriangles)) {
        const groupTriangles = buildObjectsWithTriangles(arrTriangles);
        result = [];
        groupTriangles
            .sort((a, b) => b.square - a.square)
            .forEach((el => {
                result.push(el.name)
            }));
    }
    return result;
}

console.log(sortTriangles('sdfsdfsdf'));