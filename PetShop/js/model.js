import ViewInit from './view.js';


class ModelMain {
    addToLocalStorage(key, data){
        localStorage.setItem(key, JSON.stringify(data));
    }
    getFromLocalStorage(key){
        JSON.parse(localStorage.getItem(key))
    }
}


class GetStart {
    constructor() {}

    static getData() {
        fetch('js/dictionary.json')
            .then(response => {
                return response.json()
            })
            .then(dictionary => {
                dataForRendiring.makeDictinary(dictionary);
            })
        fetch('js/dataBase.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                dataForRendiring.makeInst(data);
            });
    }
}

class ModelStore extends ModelMain {
    constructor() {
        super();
        this.dataBase;
        this.filterDataBase = [];
        this.subFilterDataBase = [];
        this.filterParams = [];
        this.dictionary;
        this.count = 0;
        this.cartOrderAmount = (this.getFromLocalStorage("cartOrderAmount")) ?
        this.getFromLocalStorage("cartOrderAmount") : []
    }
}

class MakeData extends ModelMain {
    makeInst(data) {
        const res = [];

        data.forEach(element => {
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

        modelStore.dataBase = this.getFromLocalStorage("dataBase") ?
        this.getFromLocalStorage("dataBase") : res;

        this.addToLocalStorage("dataBase", modelStore.dataBase);
        /* ViewInit.create(); */

    }
    makeDictinary(dictionary) {
        this.dictionary = dictionary;
    }
}

/* export const dataForRendiring = new MakeData(); */

class Animal {
    constructor(dataBase) {
        this.id = dataBase.id;
        this.type = dataBase.type;
        this.name = dataBase.name;
        this.price = dataBase.price;
        this.orderAmount = 0;
        this.url = dataBase.url;
        this.quantity = dataBase.quantity;
        this.ageMonth = dataBase.ageMonth;
        this.weightKg = dataBase.weightKg;
        this.color = dataBase.color;
        this.gender = dataBase.gender;
        this.lifetimeYears = dataBase.lifetimeYears;
        this.rapacity = dataBase.rapacity
    }
}

class CatDog extends Animal {
    constructor(dataBase) {
        super(dataBase);
        this.fur = dataBase.fur;
        this.shortLegged = dataBase.shortLegged;
        this.pedigree = dataBase.pedigree;
        this.trimming = dataBase.trimming;
    }
}

class Cat extends CatDog {
    constructor(dataBase) {
        super(dataBase);
        this.lopiness = dataBase.lopiness;
    }
}

class Dog extends CatDog {
    constructor(dataBase) {
        super(dataBase);
        this.specialization = dataBase.specialization;
    }
}

class Fish extends Animal {
    constructor(dataBase) {
        super(dataBase);
        this.freshwater = dataBase.zonality;
        this.zonality = dataBase.zonality;
    }
}

class Bird extends Animal {
    constructor(dataBase) {
        super(dataBase);
        this.flying = dataBase.flying;
        this.talking = dataBase.talking;
        this.singing = dataBase.singing;
    }
}