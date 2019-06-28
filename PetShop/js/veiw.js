import {
  dataForRendiring
} from './model.js';
import HangEvents from './controller.js';

export default class LaunchView {
  static rendering(container) {
    this.cs = new ViewComposeSlider(container);
    this.lang = 'en';
    this.cs.create(this.lang);
    HangEvents.listeners();
    ViewCart.buildCart();
  }
}

class ViewComposeSlider {
  constructor(goodsForRending) {
    this.targetElem = document.querySelector('.content');
    this.goodsForRending = goodsForRending;
    this.count = 0;
    this.lang;
  }

  create(lang, data = this.goodsForRending) {
    this.targetElem.innerHTML = '';
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('wrapp');

    for (let i = 0; i < 4; i++) {
      parentDiv.appendChild(ViewBuildCard.buildItem(data[this.count], lang));
      this.count < 19 ? this.count++ : this.count = 0;
    }
    this.targetElem.appendChild(parentDiv);
  }


  createWithAnotherLang(lang) {
    this.count = this.count - 4 < 0 ?
      this.count = 0 :
      this.count - 4;
    this.create(lang);
  }

  createNext(lang) {
    let data = this.goodsForRending[0].id === 1 ?
      this.goodsForRending :
      this.goodsForRending.reverse();

    this.create(lang, data);
  }

  createPrev(lang) {
    let data = this.goodsForRending[0].id === 1 ?
      this.goodsForRending.reverse() :
      this.goodsForRending;

    this.create(lang, data);
  }
}

class ViewBuildCard {
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
        key !== "price" &&
        key !== "orderAmount") {

        res += `<p>${dataForRendiring.dictionary[lang][key]} : ${values}</p>`
      }
    }
    return res;
  }

  static buildItem(goodsUnit, lang) {
    let cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    /*  cardDiv.setAttribute('id',`${goodsUnit.id}`); */
    cardDiv.innerHTML = `
                <img src=${goodsUnit.url}>
                <div class="card-section">
                <h4>${dataForRendiring.dictionary[lang][goodsUnit.name]}</h4>
                <p>${goodsUnit.price}$</p>
                <div class="order-controls">
                <button class="btn-remove-from-cart" data-id=${goodsUnit.id}>-</button>
                <span class="order-amount">${goodsUnit.orderAmount}</span>
                <button class="btn-add-from-cart" data-id=${goodsUnit.id}>+</button>
                </div>
                <div class="animalInfo">
                ${this.chooseSpecialCharacteristics(goodsUnit, lang)}
                </div>
                </div>
                <a href="#" class="cart">cart</a>
                `;
    cardDiv.querySelector('.order-controls').addEventListener('click', HangEvents.handlerCart);
    return cardDiv;
  }
}

export class ViewPopupEnough {
  static showPopup(element) {
    let popup = document.createElement('div');
    popup.classList.add('showPopup');
    popup.innerText = `Not enough goods in stock`;
    element.appendChild(popup);

    setTimeout(() => element.children[0].remove(), 1500);
  }
}

export class ViewCart {
  static buildCart() {

    let totalCost = 0,
      popup = document.createElement('div');

    popup.classList.add('CartCart');

    if (dataForRendiring.cartOrderAmount.length === 0) {
      popup.innerHTML = `<p>Nothing ordered</p>`

    } else {
      dataForRendiring.cartOrderAmount.forEach((goodsUnit) => {
        totalCost += (goodsUnit.price * goodsUnit.orderAmount);

        popup.innerHTML += `
      <div>
      <img src=${goodsUnit.url}>
      <span>${dataForRendiring.dictionary[LaunchView.lang][goodsUnit.name]}</span>
      <p>${goodsUnit.price}$ x ${goodsUnit.orderAmount}</p>

      </div> `
      })
      popup.innerHTML += `
      <span>Total cost: ${totalCost}</span>
      <button class="purchase">BUY</button>
      `
    }
    /*      popup.querySelector('.order-controlsss') !== null ? 
         popup.querySelector('.order-controlsss').addEventListener('click', HangEvents.handlerCart) : 0; */
    popup.querySelector('.purchase') !== null ? popup.querySelector('.purchase').addEventListener('click', HangEvents.purchaseGoods) : 0;
    document.querySelector('.cartttt').appendChild(popup);

  }
}

export class ViewModalPurchase {
    static buildModalPurchase() {

        let modalPurchase = document.createElement('div');
        modalPurchase.classList.add('modalPurchase');
        modalPurchase.innerHTML += `
    <form action="mailto:vlad@htbook.ru" class="modalPurchase__form">
      <label for="name">Name</label>
      <input type="text" placeholder="Input your name" id="name" required="required" class="modalPurchase__form-name">
      <label for="surname">Surname</label>
      <input type="text" placeholder="Input your Surname" id="surname" required="required" class="modalPurchase__form-surname">
      <label for="email">Email</label>
      <input type="email" placeholder="Input your email" id="email" required="required" class="modalPurchase__form-email">
      <label for="tel">Telephone</label>
      <input type="tel" placeholder="Input tel number" id="tel" class="modalPurchase__form-tel">
      <input type="button" value="Сonfirm order" class="confirm-order">
      </form>`
      document.body.appendChild(modalPurchase);
      document.querySelector('.confirm-order').addEventListener('click', HangEvents.confirmOrder)
}
}