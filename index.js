import _endsWith from './_endsWith.js';
import toLC from './_toLC.js';
import toUC from './_toUC.js';
import _includes from './_includes.js';
import _indexOf from './_indexOf.js';
import _lastIndexOf from './_lastIndexOf.js';
import _split from './_split.js';
import _repeat from './_repeat.js';
import _subStr from './_subStr.js';
import _trim from './_trim.js';

console.log(toLC('aQQd'))
console.log(toUC('aQQd', 'en'));
console.log(_endsWith('вопрос.', 'Быть или не быть, вот в чём вопрос.'));
console.log(_includes('sv', 'asdASDAAaaasv'));
console.log(_indexOf('sv', 'asdASDAAasvsv'));
console.log(_lastIndexOf('sv', 'asvdAasvcsvvvvcvbvv'));
console.log(_repeat('dfds', 1));
console.log(_subStr('df1111ds', 1, 5));
console.log(_trim('  df1111d   '));
