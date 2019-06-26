
import  {dataForRendiring}  from './model.js';
import  HangEvents  from './controller.js';

export default class LaunchView {
  static rendering(container) {
    
    this.cs = new ComposeSlider(container);
    this.lang = 'en';
    this.cs.create(this.lang);
    HangEvents.listeners();
  }
}

class ComposeSlider {
  constructor(goodsForRending) {
    this.targetElem = document.querySelector('.content');
    this.goodsForRending = goodsForRending;
    this.count = 0;
    this.lang;
  }

  create(lang) {
    this.targetElem.innerHTML = '';

    let parentDiv = document.createElement('div');
    parentDiv.classList.add('wrapp');

    for (let i = 0; i < 4; i++) {
      parentDiv.appendChild(BuildCard.builItem(this.goodsForRending[this.count], lang));
      this.count < 19 ? this.count++ : this.count = 0;

    }
    this.targetElem.appendChild(parentDiv);
  }

  createWithAnotherLang(lang) {
    this.count = this.count - 4 < 0 ? this.count = 0 : this.count - 4;
    this.create(lang);
  }

  createPrev(lang) {
    this.targetElem.innerHTML = '';
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('wrapp');

    for (let i = 0; i < 4; i++) {
      parentDiv.appendChild(BuildCard.builItem(this.goodsForRending[this.count], lang));
      this.count > 0 ? this.count-- : this.count = 19;
    }
    this.targetElem.appendChild(parentDiv);
  }
}

class BuildCard {
  static chooseSpecialCharacteristics(goodsUnit, lang) {
    let res = ``;

    for (let key in goodsUnit) {
      let values = ``;

      if (Array.isArray(goodsUnit[key])) {
        goodsUnit[key].forEach((el) => {
          values += `${dataForRendiring.dictionary[lang][el]} `
        })
      } else {
        values = Number.isNaN(+[goodsUnit[key]]) ?
        dataForRendiring.dictionary[lang][goodsUnit[key]] :
          goodsUnit[key];
      }

      if (key !== "name" &&
        key !== "id" &&
        key !== "url" &&
        key !== "type" &&
        key !== "price") {

        res += `<p>${dataForRendiring.dictionary[lang][key]} : ${values}</p>`
      }
    }
    return res;
  }

  static builItem(goodsUnit, lang) {
    let cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
                <img src=${goodsUnit.url}>
                <div class="card-section">
                <h4>${dataForRendiring.dictionary[lang][goodsUnit.name]}</h4>
                <p>${goodsUnit.price}$</p>
                <div class="animalInfo">
                ${this.chooseSpecialCharacteristics(goodsUnit, lang)}
                </div>
                </div>
                <a href="#" class="cart">cart</a>
                `
    return cardDiv;
  }
}