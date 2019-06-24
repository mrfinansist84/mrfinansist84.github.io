import ComposeSlider from './veiw.js';
import {
    Cat,
    Dog,
    Bird,
    Fish,
    CatRu,
    DogRu,
    BirdRu,
    FishRu
} from './model.js';
import getStart from './main.js'

export default class init {
    constructor(dataBase) {}
    static productionAnimal(dataBase) {
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
                case 'catRu':
                    res.push(new CatRu(element));
                    break;
                case 'dogRu':
                    res.push(new DogRu(element));
                    break;
                case 'fishRu':
                    res.push(new FishRu(element));
                    break;
                case 'birdRu':
                    res.push(new BirdRu(element));
                    break;
            }
        });

        return res
    }

    static init(dataBase) {
        let count = 0;
        let link;
        this.cs = new ComposeSlider(this.productionAnimal(dataBase), link, count);
        this.cs.create();
        this.listeners()
    }

    static listeners() {
        const btnContainer = document.querySelector('.language');
        btnContainer.addEventListener('click', this.switchLang);

        const container = document.querySelector('.grid-container');
        container.addEventListener('click', this.showInfo);

    }
    static showInfo(e) {
        switch (e.target.innerText) {
            case 'More info': {
                e.target.previousSibling.previousSibling.classList.toggle('addInfo');
            };
            break;
        case 'next': {
            init.cs.create();
        };
        break;
        case 'prev': {
            init.cs.createPrev()
        };
        break;
        }
    }
    static switchLang(e) {
        switch (e.target.innerText) {
            case 'РУССКИЙ': {
                getStart.getData('js/dataBaseRu.json');
            };
            break;
        case 'ENGLISH': {
            getStart.getData('js/dataBaseEn.json');
        };
        break;
        }
    }
}
