import init from './controller.js';

export default class GetStart {
    constructor() {}

    static getData(url = 'js/dataBaseEn.json') {
        return fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                p.makeInst(data);
            })
    }
}

export class ProductionAnimal {
    constructor() {
        this.container;
    }
    makeInst(dataBase) {
        const res = [];

        dataBase.forEach(element => {
            switch (element.type) {
                case 'cat':
                    res.push(new Cat(element));
                    break;
                case 'dog':
                    res.push(new Dog(element));
                    break;
                case 'fish':
                    res.push(new Fish(element));
                    break;
                case 'bird':
                    res.push(new Bird(element));
                    break;
            }
        });
        this.container = res;
        init.init(this.container);
    }

    translate(lang) {
        switch (lang) {
            case "EN": {
                fetch('js/dictionaryRuEn.json')
                    .then(response => {
                        return response.json()
                    })
                    .then(dictionary => {
            
                        this.translaterMan(dictionary);
                    })
                    break;
            }
            case "RU": {
                fetch('js/dictionaryEnRu.json')
                    .then(response => {
                        return response.json()
                    })
                    .then(dictionary => {
                        this.translaterMan(dictionary);
                    })
                    break;
            }
        }
      
        init.init(this.container);
    }
    translaterMan(dictionary) {
        this.container.forEach(element => {
            for (let keya in dictionary) {
                for (let keyb in element) {
                    if (keya === element[keyb]) {
                        element[keyb] = dictionary[keya];
                    }
                    if (keya === keyb) {
                        element[dictionary[keya]] = element[keyb];
                        delete element[keyb];
                    }

                    for (let keyb in element.feature) {
                        if (Array.isArray(element.feature[keyb])) {
                            element.feature[keyb].forEach((el, i) => {
                                if (keya === el) {
                                    element.feature[keyb][i] = dictionary[keya];
                                }
                            })
                        }
                        if (keya === element.feature[keyb]) {
                            element.feature[keyb] = dictionary[keya];
                        }
                        if (keya === keyb) {
                            element.feature[dictionary[keya]] = element.feature[keyb];
                            delete element.feature[keyb];

                        }
                    }
                }
            }
        });
    }

}

export const p = new ProductionAnimal();




class Animal {
    constructor(dataBase) {
        this.id = dataBase.id;
        this.type = dataBase.type;
        this.name = dataBase.name;
        this.price = dataBase.price;
        this.url = dataBase.url;
        this.feature = {
            quantity: dataBase.quantity,
            ageMonth: dataBase.ageMonth,
            weightKg: dataBase.weightKg,
            color: dataBase.color,
            gender: dataBase.gender,
            lifetimeYears: dataBase.lifetimeYears,
            rapacity: dataBase.rapacity
        }
    }
}

class CatDog extends Animal {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            fur: dataBase.fur,
            shortLegged: dataBase.shortLegged,
            pedigree: dataBase.pedigree,
            trimming: dataBase.trimming,
        }
    }
}

export class Cat extends CatDog {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            lopiness: dataBase.lopiness
        }
    }
}

export class Dog extends CatDog {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            specialization: dataBase.shortLegged
        }
    }
}

export class Fish extends Animal {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            freshwater: dataBase.zonality,
            zonality: dataBase.zonality
        }
    }
}

export class Bird extends Animal {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            flying: dataBase.flying,
            talking: dataBase.talking,
            singing: dataBase.singing,

        }
    }
}