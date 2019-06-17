  describe(`Сортировка треугольников: основная функция sortTriangles 
  сортирует заданные треугольники по площади`, function () {
      it(`вызвать функцию можно с любым количеством треугольников. 
      Выводит массив названий треугольников в порядке убывания из площади`, function () {
          assert.deepEqual(sortTriangles([{
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
          ]), ['VCX', 'CBA', 'ABC']);
      });
  });

  describe(`Сортировка треугольников: 
  вспомогательная функция проверки аргументов checkData`, function () {
      it('проверка первого аргумента на то, что название треугольника это строка', function () {
          assert.deepEqual(checkData([{
              vertices: 5345345,
              a: 10,
              b: 20,
              c: 22.36
          }]), {
            status: 'failed',
            reason: 'Wrong type of the arguments',
        });
      });
      it('проверка на то, что стороны переданы числами', function () {
          assert.deepEqual(checkData([{
              vertices: 'ABC',
              a: 'sdfsdf',
              b: 20,
              c: 22.36
          }]), {
            status: 'failed',
            reason: 'Wrong type of the arguments',
        });
      });
      it('проверка на то, что стороны больше 0', function () {
        assert.deepEqual(checkData([{
            vertices: 'ABC',
            a: -10,
            b: 20,
            c: 22.36
        }]), {
            status: 'failed',
            reason: 'Too small value of argument',
        });
    });
    it('нарушен закон неравенства сторон трехугольника', function () {
        assert.deepEqual(checkData([{
            vertices: 'ABC',
            a: 1,
            b: 2,
            c: 3
        }]), {
            status: 'failed',
            reason: 'The law of triangles is broken',
        });
    });
    it('в аргументах пустой массив или передан не массив', function () {
        assert.deepEqual(checkData([]), {
            status: 'failed',
            reason: 'Not array or empty array passed to the arguments',
        });
    });
  });


  describe(`Сортировка треугольников: вспомогательная функция calcSquareGerona
   вычисление площади треугольника по формуле Герона`, function () {
      it(`Принимает на вход массив из 4 аргументов (название треугольники и длины 
        сторон треугольника.). Выводит площадь треугольника`, function () {
          assert.equal(calcSquareGerona(['name', 10, 20, 22]), 99.91996797437437);
      });
  });


  describe(`Сортировка треугольников: вспомогательная функция buildObjectsWithTriangles
   формирующая массив объектов со свойствами имен треугольников и их площадями 
   для последующей сортировки`, function () {
      it(`принимает массив из 3 объектов(названия, стороны) - 
      возвращает массив из 3 объектов(названия, площади)`, function () {
          assert.deepEqual(buildObjectsWithTriangles([{
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
              ]),
              [{
                      square: 99.9999997112,
                      name: "ABC"
                  },
                  {
                      square: 230.1215076580183,
                      name: "CBA"
                  },
                  {
                      square: 757.3268292070452,
                      name: "VCX"
                  }
              ]);
      });
  });