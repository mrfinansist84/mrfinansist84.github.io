const primeryFruits = ['banan', 'lemon', 'graps'];
const goodFruits = ['mango', 'avocado'];

/* 
Вариант 1 
function CalcCost(...ingredients) {
    let cost = 0;

    ingredients.forEach(ingredient => {
        if (primeryFruits.includes(ingredient)) {
            return cost += 5;
        } else if (goodFruits.includes(ingredient)) {
            return cost += 7;
        } else {
            return cost += 9
        }
    })

    return cost / ingredients.length;
} */

/* Вариант 2
function CalcCost2(...ingredients) {
    let cost = 0;

    ingredients.forEach(ingredient => {
        if (primeryFruits.filter(el => el === ingredient).length > 0 ) {
            return cost += 5;
        } else if (goodFruits.filter(el => el === ingredient).length > 0 ) {
            return cost += 7;
        } else {
            return cost += 9
        }
    })

    return cost / ingredients.length;
} 
 */

/* Вариант 3 */
/* function checkEntry(ingredient, arrFruits) {
    if (arrFruits.includes(ingredient)) {
        return true;
    }
}

function checkIncomeData(ingredients) {
    let arr = [];
    ingredients.forEach(ingredient => {
        if (typeof ingredient !== 'string') {
            return arr.push(false);
        } else if (ingredient.length < 2) {
            return arr.push(false);
        } else {
            return arr.push(true);
        }
    })
    return arr.every(el => el !== false);
}

function CalcCost3(...ingredients) {

    if (checkIncomeData(ingredients)) {
        let cost = 0;

        ingredients.forEach(ingredient => {
            if (checkEntry(ingredient, primeryFruits)) {
                return cost += 5;
            } else if (checkEntry(ingredient, goodFruits)) {
                return cost += 7;
            } else {
                return cost += 9
            }
        })
        return cost / ingredients.length;
    } else return `Incorrect data`;
} */

/* Вариант 4 */

class CalcOrder {
    constructor(...ingredients) {
        this.ingredients = ingredients;
    }
    checkEntry(ingredient, arrFruits) {
        if (arrFruits.includes(ingredient)) {
            return true;
        }
    }
    checkIncomeData(ingredients) {
        let arr = [];
        this.ingredients.forEach(ingredient => {
            if (typeof ingredient !== 'string') {
                return arr.push(false);
            } else if (ingredient.length < 2) {
                return arr.push(false);
            } else {
                return arr.push(true);
            }
        })
        return arr.every(el => el !== false);
    }

    CalcCost(ingredients) {

        if (this.checkIncomeData(ingredients)) {
            let cost = 0;
    
            this.ingredients.forEach(ingredient => {
                if (this.checkEntry(ingredient, primeryFruits)) {
                    return cost += 5;
                } else if (this.checkEntry(ingredient, goodFruits)) {
                    return cost += 7;
                } else {
                    return cost += 9
                }
            })
            return cost / this.ingredients.length;
        } else return `Incorrect data`;
    }
}

let calcOrder = new CalcOrder('banan', 'avvakado');
calcOrder.CalcCost();