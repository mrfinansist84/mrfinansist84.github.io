 describe('Basic tests', function () {
     it('прийти к sum можно', function () {
         assert.equal(calcEqualNum([1, 3, 4, 6, 8], -2), true);
     });
     it('прийти к sum можно', function () {
         assert.equal(calcEqualNum([15, 2, 3], 10), true);
     });
     it('прийти к sum невозможно', function () {
         assert.equal(calcEqualNum([1, 5, 3, 2, 5], -2), false);
     });
 });