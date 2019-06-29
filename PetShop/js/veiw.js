import {
  dataForRendiring
} from './model.js';
import HangEvents from './controller.js';

export default class ViewInit {
  static create() {
    ViewHeader.create();
    ViewMain.create();
    ViewStartPage.create();
    ViewCart.buildCart(LaunchView.lang = 'en');
    ViewFooter.create();
    document.querySelector('.main__wrapper').addEventListener('click', HangEvents.handlerEnter);
    document.querySelector('.main__wrapper').addEventListener('click', HangEvents.chooseCategory);
    document.querySelector('.cartttt').addEventListener('click', HangEvents.showCart);
    console.log(dataForRendiring.cartOrderAmount.length)
    document.querySelector('.goodsIntoCart').innerText = dataForRendiring.cartOrderAmount.length;
  }
}

 export class LaunchView {
  static rendering(container) {
    ViewPageChoice.createPageChoice();
    this.cs = new ViewComposeSlider(container);
    this.lang = 'en';
    this.cs.create(this.lang);
    HangEvents.listeners();
    ViewCart.buildCart();
  }
}

export class ViewComposeSlider {
  constructor(goodsForRending) {
    this.targetElem = document.querySelector('.slider');
    this.goodsForRending = goodsForRending;
    this.count = 0;
    this.goodsLength = this.goodsForRending.length < 4 ?
      this.goodsForRending.length : 4;
    this.lang;
  }

  create(lang, data = this.goodsForRending) {
    this.targetElem.innerHTML = '';
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('wrapp');

    for (let i = 0; i < this.goodsLength; i++) {
      if (data[this.count]) {
        parentDiv.appendChild(ViewBuildCard.buildItem(data[this.count], lang));
        this.count < 19 ? this.count++ : this.count = 0;
      }
    }
    document.querySelector('.slider').appendChild(parentDiv);
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
console.log(dataForRendiring.cartOrderAmount)
    let totalCost = 0,
      popup = document.createElement('div');
    popup.classList.add('CartCart');

    if (dataForRendiring.cartOrderAmount.length === 0) {
      
      popup.innerHTML = `<p>Nothing ordered</p>`

    } else {
      dataForRendiring.cartOrderAmount.forEach((goodsUnit) => {
        console.log(dataForRendiring.dictionary)
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
         popup.querySelector('.order-controlsss').addEventListener('click', HangEvents.handlerCart) : 0; кнопки в корзине*/
    popup.querySelector('.purchase') !== null ?
      popup.querySelector('.purchase')
      .addEventListener('click', HangEvents.purchaseGoods) : 0;

    document.querySelector('.header').appendChild(popup);

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
    document.querySelector('.main__wrapper').appendChild(modalPurchase);
    document.querySelector('.confirm-order')
      .addEventListener('click', HangEvents.confirmOrder);
  }
}


export class ViewPageChoice {
  static createPageChoice() {
    let pageChoice = document.createElement('div');
    pageChoice.classList.add('page-choice');
    pageChoice.innerHTML += `
    <aside>
    <ul class="categories">
    <li class="categories-items categories-items-all">All Animals</li>
    <li class="categories-items categories-items-cats">Cats</li>
    <li class="categories-items categories-items-dogs">Dogs</li>
    <li class="categories-items categories-items-fishes">Fishes</li>
    <li class="categories-items categories-items-birds">Birds</li>
    </aside>
    <div class="grid-container">
    <button class="button-prev">
      prev
    </button>
    <div class='slider'></div>
    
    <button class="button-next">
      next
    </button>
  </div>
    
    `
    pageChoice.querySelector('.categories')
      .addEventListener('click', HangEvents.chooseCategory);
    document.querySelector('.main__wrapper').appendChild(pageChoice);
  }
}

export class ViewFilterCat {
  static createPageChoice() {
    let filters = document.createElement('div');
    filters.classList.add('categories__filters');
    filters.innerHTML += `
    <label>Breed
    <input type="text" id="searchBar" class="filters-searchBar">
    </label>
    <div class="filters-checkbox">
    <label for="shortLegged">shortLegged</label>
    <input type="checkbox" id="shortLegged" class="e">
    <label for="pedigree">pedigree</label>
    <input type="checkbox" id="pedigree" class="e">
    <label for="trimming">trimming</label>
    <input type="checkbox" id="trimming" class="e">
    <label for="lopiness">lopiness</label>
    <input type="checkbox" id="lopiness" class="e">
    </div>
    `
    filters.querySelector('.filters-checkbox')
      .addEventListener('click', HangEvents.filtersCheckbox);

    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', HangEvents.filterSearchBar);

    document.querySelector('.main__wrapper').appendChild(filters);
  }
}

export class ViewFilterDog {
  static createPageChoice() {
    let filters = document.createElement('div');
    filters.classList.add('categories__filters');
    filters.innerHTML += `

    <label>Breed
    <input type="text" id="searchBar" class="filters-searchBar">
    </label>
    <div class="filters-checkbox">
    <label for="shortLegged">shortLegged</label>
    <input type="checkbox" id="shortLegged" class="e">
    <label for="pedigree">pedigree</label>
    <input type="checkbox" id="pedigree" class="e">
    <label for="trimming">trimming</label>
    <input type="checkbox" id="trimming" class="e">
   
    <p>specialization: </p>
    <label for="domastic">domastic</label>
    <input type="checkbox" id="domastic" class="e">
    <label for="decorate">decorate</label>
    <input type="checkbox" id="decorate" class="e">
    <label for="guard">guard</label>
    <input type="checkbox" id="guard" class="e">
    <label for="hunting">hunting</label>
    <input type="checkbox" id="hunting" class="e">
    
    `
    filters.querySelector('.filters-checkbox')
      .addEventListener('click', HangEvents.filtersCheckbox);
    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', HangEvents.filterSearchBar);
    document.querySelector('.main__wrapper').appendChild(filters);
  }
}

export class ViewFilterFish {
  static createPageChoice() {
    let filters = document.createElement('div');
    filters.classList.add('categories__filters');
    filters.innerHTML += `

    <label>Breed
    <input type="text" id="searchBar" class="filters-searchBar">
    </label>
    <div class="filters-checkbox">
    <label for="freshwater">freshwater</label>
    <input type="checkbox" id="freshwater" class="e">
    
    <p>zonality: </p>
    <label for="up">up</label>
    <input type="checkbox" id="up" class="e">
    <label for="down">down</label>
    <input type="checkbox" id="down" class="e">
    <label for="mid">mid</label>
    <input type="checkbox" id="mid" class="e">

    <p>color: </p>
    <label for="yellow">yellow</label>
    <input type="checkbox" id="yellow" class="e">
    <label for="grey">grey</label>
    <input type="checkbox" id="grey" class="e">
    <label for="blue">blue</label>
    <input type="checkbox" id="blue" class="e">
    <label for="red">red</label>
    <input type="checkbox" id="red" class="e">
    `
    filters.querySelector('.filters-checkbox')
      .addEventListener('click', HangEvents.filtersCheckbox);
    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', HangEvents.filterSearchBar);
    document.querySelector('.main__wrapper').appendChild(filters);
  }
}

export class ViewFilterBird {
  static createPageChoice() {
    let filters = document.createElement('div');
    filters.classList.add('categories__filters');
    filters.innerHTML += `
    <label>Breed
    <input type="text" id="searchBar" class="filters-searchBar">
    </label>
    <div class="filters-checkbox">
    <label for="flying">flying</label>
    <input type="checkbox" id="flying" class="e">
    <label for="talking">talking</label>
    <input type="checkbox" id="talking" class="e">
    <label for="singing">singing</label>
    <input type="checkbox" id="singing" class="e">

    <p>color: </p>
    <label for="yellow">yellow</label>
    <input type="checkbox" id="yellow" class="e">
    <label for="grey">grey</label>
    <input type="checkbox" id="grey" class="e">
    <label for="blue">blue</label>
    <input type="checkbox" id="blue" class="e">
    <label for="red">red</label>
    <input type="checkbox" id="red" class="e">
    <label for="white">white</label>
    <input type="checkbox" id="white" class="e">
    `
    filters.querySelector('.filters-checkbox')
      .addEventListener('click', HangEvents.filtersCheckbox);
    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', HangEvents.filterSearchBar);
    document.querySelector('.main__wrapper').appendChild(filters);
  }
}

class ViewHeader {
  static create() {
    let header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML += `
    <div class="header__wrapper">
    <a href='javascript:void(0);'>
    <img src='assets/img/generic/logo.png'>
    </a>
    <div class="language">
    <button class="btn-lang-au">
      УКРАIНСЬКИЙ
    </button>
    <button class="btn-lang-ru">
      РУССКИЙ
    </button>
    <button class="btn-lang-en">
      ENGLISH
    </button>
  </div>
    <div class="cartttt">
      КОРЗИНА
      <span><i class="goodsIntoCart"></i> item(s)</span>
    </div>
    </div>
    `
    document.querySelector('.root').appendChild(header);
  }
}

class ViewMain {
  static create() {
    let main = document.createElement('main');
    main.classList.add('main');
    main.innerHTML += `
    <div class="main__wrapper">
    </div>
    `
    document.querySelector('.root').appendChild(main);
  }
}

class ViewFooter {
  static create() {
    let footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML += `
    <div class="footer__wrapper">
        <div class="footer__item footer__item--tel">
        <p>098-999-99999</p>
        </div>
        <div class="footer__item footer__item--adress">
        <p>Dnipro city</p>
        </div>
        <div class="footer__item footer__item--email">
        <p>dnipro@codiv.com.ua</p>
        </div>
    </div>
    `
    document.querySelector('.root').appendChild(footer);
  }
}


class ViewStartPage {
  static create() {
    let startPage = document.createElement('div');
    startPage.classList.add('main__start-page');
    startPage.innerHTML += `
  

    <div class="main__start-page-block main__start-page-block--bird">
            <div class="main__start-page-block-img">
            <img src='assets/img/generic/papuga.jpg'>
            </div>
          <div class="main__start-page-block-text">
          <h2 class="main__start-page-block-header">Birds of any breeds and colors</h2>
          <p class="main__start-page-block-subheader">Birds are extraordinarily pleasant 
          creatures. With their appearance, songs, lively bustle, they can decorate any home.</p>
          <button class="main__start-page-block-btn">enter</button>
          </div>
          </div>

    <div class="main__start-page-block main__start-page-block--categories">
    <h2 class="main__start-page-block-header">Popular categories</h2>
    <div class="main__start-page-block-links">
      <a href="javascript:void(0);" class="main__start-page-block-dogs">
      <figure class="main__start-page-block-dogs">
      <img src="assets/img/generic/dog.jpg" alt="dog" class="main__start-page-block-dogs"/>
      <figcaption class="main__start-page-block-dogs">Dogs</figcaption>
      </figure>
      </a>

      <a href="javascript:void(0);" class="main__start-page-block-cats">
      <figure class="main__start-page-block-cats">
      <img src="assets/img/generic/cat.jpg" alt="cat" class="main__start-page-block-cats"/>
      <figcaption class="main__start-page-block-cats">Cats</figcaption>
      </figure>
      </a>

      <a href="javascript:void(0);" class="main__start-page-block-fishes">
      <figure class="main__start-page-block-fishes">
      <img src="assets/img/generic/fish.jpg" alt="fishes" class="main__start-page-block-fishes" />
      <figcaption class="main__start-page-block-fishes">Fish</figcaption>
      </figure>
      </a>

      <a href="javascript:void(0);" class="main__start-page-block-birds">
      <figure class="main__start-page-block-birds">
      <img src="assets/img/generic/bird.jpg" alt="bird" class="main__start-page-block-birds"/>
      <figcaption class="main__start-page-block-bird">Birds</figcaption>
      </figure>
      </a>
      </div>
    </div>

    <div class="main__start-page-block main__start-page-block--dog">
    <div class="main__start-page-block-text">
    <h2 class="main__start-page-block-header">Dog of any breeds and specializations</h2>
    <p class="main__start-page-block-subheader">Dogs tend to give than to ask for something for themselves. 
    Their love is unconditional.</p>
    <button class="main__start-page-block-btn">enter</button>
    </div>
  <div class="main__start-page-block-img">
  <img src='assets/img/generic/pug.jpg'>
  </div>
</div>
    `
    document.querySelector('.main__wrapper').appendChild(startPage);
  }
}