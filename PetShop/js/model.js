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

class AnimalRu {
    constructor(dataBase) {
        this.id = dataBase.id;
        this.type = dataBase.type;
        this.name = dataBase.name;
        this.price = dataBase.price;
        this.url = dataBase.url;
        this.feature = {
            Количество: dataBase.quantity,
            Возраст: dataBase.ageMonth,
            Вес: dataBase.weightKg,
            Окрас: dataBase.color,
            Пол: dataBase.gender,
            Сколькопротянет: dataBase.lifetimeYears,
            Хищник: dataBase.rapacity
        }
    }
}

class CatDogRu extends AnimalRu {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            Шерсть: dataBase.fur,
            Коротконогая: dataBase.shortLegged,
            Родословная: dataBase.pedigree,
            Купирована: dataBase.trimming,
        }
    }
}

export class CatRu extends CatDogRu {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            Вислоухая: dataBase.lopiness
        }
    }
}

export class DogRu extends CatDogRu {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            Специализация: dataBase.shortLegged
        }
    }
}

export class FishRu extends AnimalRu {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            Пресноводная: dataBase.freshwater,
            Зональность: dataBase.freshwater
        }
    }
}

export class BirdRu extends AnimalRu {
    constructor(dataBase) {
        super(dataBase);
        const feature = this.feature;
        this.feature = {
            ...feature,
            Летает: dataBase.flying,
            Разговаривает: dataBase.talking,
            Поет: dataBase.singing
        }
    }
}