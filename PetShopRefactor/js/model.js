export default class ModelGetStart {
    getData() {
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

class MakeData {
    constructor() {
            this.container;
            this.filterContainer = [];
            this.subFilterContainer = [];
            this.filterParams = [];
            this.dictionary;
            this.count = 0;
            this.cartOrderAmount = (JSON.parse(localStorage.getItem("cartOrderAmount"))) ?
                JSON.parse(localStorage.getItem("cartOrderAmount")): []
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
                  
                    this.container = JSON.parse(localStorage.getItem("container")) ?
                    JSON.parse(localStorage.getItem("container")): res;

                    localStorage.setItem("container", JSON.stringify(this.container));
                    

                }

                makeDictinary(dictionary) {
                    this.dictionary = dictionary;
                }
            }

            export const dataForRendiring = new MakeData();

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

            export class Cat extends CatDog {
                constructor(dataBase) {
                    super(dataBase);
                    this.lopiness = dataBase.lopiness;
                }
            }

            export class Dog extends CatDog {
                constructor(dataBase) {
                    super(dataBase);
                    this.specialization = dataBase.specialization;
                }
            }

            export class Fish extends Animal {
                constructor(dataBase) {
                    super(dataBase);
                    this.freshwater = dataBase.zonality;
                    this.zonality = dataBase.zonality;
                }
            }

            export class Bird extends Animal {
                constructor(dataBase) {
                    super(dataBase);
                    this.flying = dataBase.flying;
                    this.talking = dataBase.talking;
                    this.singing = dataBase.singing;
                }
            }