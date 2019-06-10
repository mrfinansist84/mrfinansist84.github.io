function checkData(arrTriangles) {
    let res = false,
        argValue,
        argKeys;

    arrTriangles.forEach((triangle) => {
        argValue = Object.values(triangle);
        argKeys = Object.keys(triangle);

        if (typeof argValue[0] === 'string' &&
            typeof argValue[1] === 'number' &&
            typeof argValue[2] === 'number' &&
            typeof argValue[3] === 'number' &&
            argValue[0].length === 3 &&
            argValue[0] === `${argKeys[1]
                .toUpperCase()}${argKeys[2]
                .toUpperCase()}${argKeys[3]
                .toUpperCase()}`) {
            res = true;

        } else {
            res = false;
        }
    });

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
    const groupTriangles = buildObjectsWithTriangles(arrTriangles);
    let result = {
        status: 'failed',
        reason: 'Input only 2 objects with keys vertices, side 1,2,3',
    };

    if (checkData(arrTriangles)) {
        result = [];
        groupTriangles
            .sort((a, b) => b.square - a.square)
            .forEach((el => {
                result.push(el.name)
            }));
    }
    return result;
}

console.log(sortTriangles([{
        vertices: 'ABC',
        a: 10,
        b: 20,
        c: 22.36
    },
    {
        vertices: 'CBA',
        c: 20,
        b: 24.33,
        a: 26
    },
    {
        vertices: 'VCX',
        v: 120,
        c: 24.33,
        x: 100
    }
]));