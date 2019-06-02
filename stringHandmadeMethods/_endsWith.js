 export default function _endsWith(searchingStr, startString) {
     let newStr = '';
     
     for (let j = 0; j < searchingStr.length; j++) {
         newStr = startString[startString.length - 1 - j] + newStr;
     }
     return newStr.toLowerCase() === searchingStr.toLowerCase();
 }

 /* export default function _endsWith(searchingStr, startString) {
        let coincidenceStr = startString.slice(-searchingStr.length); 
         return coincidenceStr.toLowerCase() === searchingStr.toLowerCase();
     } */

     