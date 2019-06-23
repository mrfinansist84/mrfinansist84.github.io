export default class ComposeSlider {
  constructor(goodsForRending, link, count /* arr of obj */ ) {
    this.targetElem = document.querySelector('.content');
    this.goodsForRending = goodsForRending;
    this.link = link;
    this.count = count;
  }

  create() {
    this.targetElem.innerHTML = '';
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('wrapp');
    this.link = {link: parentDiv};

    for (let i = 0; i < 4; i++) {
      
      parentDiv.appendChild(BuildCard.builItem(this.goodsForRending[this.count]));
      this.count < 19 ? this.count++ : this.count = 0;

    }
  
    this.targetElem.appendChild(parentDiv);
  }
  
  createPrev() {
    this.targetElem.innerHTML = '';
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('wrapp');
    this.link = {link: parentDiv};

    for (let i = 0; i < 4; i++) {
     
      parentDiv.appendChild(BuildCard.builItem(this.goodsForRending[this.count]));
      this.count > 0 ? this.count-- : this.count = 19;

    }
  
    this.targetElem.appendChild(parentDiv);
  }
}

class BuildCard {
  constructor(goodsUnit) {
    this.goodsUnit = goodsUnit;
  }

  static chooseSpecialCharacteristics(goodsUnit) {
    const {
      feature
    } = goodsUnit;
    let res = ``;

    for (let key in feature) {
      res += `<p>${key}: ${feature[key]}</p>`
    }
    return res;
  }

  static builItem(goodsUnit) {
    let cardDiv = document.createElement('div');
    
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
                <img src=${goodsUnit.url}>
                <div class="card-section">
                <h4>${goodsUnit.name}</h4>
                <p>${goodsUnit.price}$</p>
                <div class="animalInfo">
                ${this.chooseSpecialCharacteristics(goodsUnit)}
                </div>
                <button class="detalies button">More info</button>
                </div>
                <a href="#" class="cart">cart</a>
                `
    return cardDiv;
  }
}