describe('Basic tests', function(){

    Test.assertEquals(getSolution([1, 3, 4, 6, 8], -2), true);

    Test.assertEquals(getSolution([15, 2, 3], 10), true);

    Test.assertEquals(getSolution([1, 5, 3, 2, 5], -2), false);

 });