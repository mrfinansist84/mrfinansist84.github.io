function sortTriangles(arrTriangles) {
    let result = checkData(arrTriangles);

    if (!checkData(arrTriangles)) {
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

function checkData(arrTriangles) {
    let res = false,
        argValue,
        a, b, c;

    if (Array.isArray(arrTriangles) &&
        arrTriangles.length > 0) {

        arrTriangles.forEach((triangle) => {
            argValue = Object.values(triangle);
            a = argValue[1];
            b = argValue[2];
            c = argValue[3];

            switch (false) {
                case (typeof argValue[0] === 'string' &&
                    typeof a === 'number' &&
                    typeof b === 'number' &&
                    typeof c === 'number'):
                    res = {
                        status: 'failed',
                        reason: 'Wrong type of the arguments',
                    };
                    break;
                case (a > 0 && b > 0 && c > 0):
                    res = {
                        status: 'failed',
                        reason: 'Too small value of argument',
                    };
                    break;
                case ((a + b > c) && (a + c > b) && (b + c > a)):
                    res = {
                        status: 'failed',
                        reason: 'The law of triangles is broken',
                    };
                    break;
            }
        })
    } else {
        res = {
            status: 'failed',
            reason: 'Not array or empty array passed to the arguments',
        };
    }

    return res;
}

function calcSquareGerona([, a, b, c]) {
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


console.log(sortTriangles([{
    vertices: 'ABC',
    a: 10,
    b: 20,
    c: 20
},
{
    vertices: 'CBA',
    c: 20,
    b: 24.33,
    a: 26
}]));