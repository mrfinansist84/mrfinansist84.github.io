export default class Model {
    getDataFromServer(storage) {
        fetch('./js/dataBase.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.makeDataBase(data, storage);
            });
    }
    getDictionaryFromServer(storage, lang="En") { 
        fetch(`./js/dictionary${lang}.json`)
            .then(response => {
                return response.json()
            })
            .then(dictionary => {
                this.makedictionary(dictionary, storage);
            })

    }

    makedictionary(dictionary, storage){
        storage.dictionary = dictionary;
    }

    makeDataBase(dataBase, storage) {
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

        storage.dataBase = JSON.parse(localStorage.getItem("dataBase")) ?
            JSON.parse(localStorage.getItem("dataBase")) : res;

        localStorage.setItem("dataBase", JSON.stringify(storage.dataBase));
    }
}

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