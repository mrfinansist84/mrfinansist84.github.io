import {
  dataForRendiring
} from './model.js';
import HangEvents from './controller.js';

export default class ViewInit {
  static create() {
    ViewHeader.create();
    ViewCart.buildCart(LaunchView.lang = 'en');
    ViewMain.create();
    ViewStartPage.create();
    ViewFooter.create();
    ViewModalHistory.create(); 
    document.querySelector('.main__wrapper').addEventListener('click', HangEvents.handlerEnter);
    document.querySelector('.main__wrapper').addEventListener('click', HangEvents.chooseCategory);
    document.querySelector('.goodsIntoCart').innerText = dataForRendiring.cartOrderAmount.length;
    document.querySelector('.cartttt').addEventListener('click', HangEvents.showCart);
  }
}

export class LaunchView {
  static rendering(container) {
    dataForRendiring.filterContainer = dataForRendiring.container;
    ViewPageChoice.createPageChoice();
    this.cs = new ViewComposeSlider(container);
    this.lang = 'en';
    this.cs.create(this.lang);
    HangEvents.listeners();
    document.querySelector('.CartCart').remove();
    ViewCart.buildCart();
    ViewModalHistory.create(); 
  }
}

export class ViewComposeSlider {
  constructor(goodsForRending) {
    this.targetElem = document.querySelector('.slider');
    this.goodsForRending = goodsForRending;
    this.lang;
  }

  create(lang, data = this.goodsForRending, count = dataForRendiring.count) {
    this.targetElem.innerHTML = '';
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('wrapp');
    parentDiv.innerHTML += `<button class="btn-slider btn-slider--prev">
    prev
  </button>`
    let dataLength = data.length < 4 ? data.length : 4;
    for (let i = 0; i < dataLength; i++) {
      if (data[count]) {
        parentDiv.appendChild(ViewBuildCard.buildItem(data[count], lang));
        dataForRendiring.count < 19 ?dataForRendiring.count++ : dataForRendiring.count = 0;
        count++
      }
    }
    parentDiv.innerHTML += `<button class="btn-slider btn-slider--next">
    next
  </button>`
 /*  parentDiv.querySelector('.btn-slider').addEventListener('click', HangEvents.showInfo);  */
    document.querySelector('.slider').appendChild(parentDiv);
  }


  createWithAnotherLang(lang, data) {
    dataForRendiring.count = dataForRendiring.count - 4 < 0 ?
    dataForRendiring.count = 0 :
    dataForRendiring.count - 4;
    this.create(lang, data);
  }

  createNext(lang, data) {
    let data_ = data[0].id === 1 ?
      data :
      data.reverse();

    this.create(lang, data_);
  }

  createPrev(lang, data) {
    let data_ = data[0].id === 1 ?
      data.reverse() :
      data;

    this.create(lang, data_);
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
    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    /*  cardDiv.setAttribute('id',`${goodsUnit.id}`); */
    cardDiv.innerHTML = `
                <div class="card-wrap">           
                <img src=${goodsUnit.url}>
                <div class="card-section">
                <h4>${dataForRendiring.dictionary[lang][goodsUnit.name]}</h4>
                <p>${goodsUnit.price}$</p>
                <div class="animalInfo">
                ${this.chooseSpecialCharacteristics(goodsUnit, lang)}
                </div>
                </div>
                </div>
                <div class="order-controls">
                <button class="btn-remove-from-cart" data-id=${goodsUnit.id}>-</button>
                <span class="order-amount">${goodsUnit.orderAmount}</span>
                <button class="btn-add-from-cart" data-id=${goodsUnit.id}>+</button>
                </div>
                `;
    return cardDiv;
  }
}

export class ViewPopupEnough {
  static showPopup(element) {
    const popup = document.createElement('div');
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
        <div class="cart-item">
      <div>
      <img src=${goodsUnit.url} class="purches-img">
      </div>
      <div>
      <span class="purches-name">${dataForRendiring.dictionary[LaunchView.lang][goodsUnit.name]}</span>
      <p class="purches-price">${goodsUnit.price}$ x ${goodsUnit.orderAmount} = ${goodsUnit.price * goodsUnit.orderAmount}</p>
      </div> 
      </div>`
      })
      popup.innerHTML += `
      <div class="totalPrice">
      <span>Total cost: ${totalCost}</span>
      <button class="purchase">BUY</button>
      </div>
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

    const modalPurchase = document.createElement('div');
    modalPurchase.classList.add('modalPurchase');
    modalPurchase.innerHTML += `
    <span class="modalPurchase__form-abort">X</span>
    <form action="#" class="modalPurchase__form">
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
      document.querySelector('.modalPurchase__form-abort')
      .addEventListener('click', HangEvents.modalClose);
  }
}

export class ViewPageChoice {
  static createPageChoice() {
    const pageChoice = document.createElement('div');
    pageChoice.classList.add('page-choice');
    pageChoice.innerHTML += `
    <aside class="page-choice-aside">
    <div class="categories">
    <input type="radio" name="pets" class="categories-items-input categories-items-input-all" id="radio-all"></input>
    <label class="categories-items categories-items-all" for="radio-all">All Animals</label>

    <input type="radio" name="pets" class="categories-items-input categories-items-input-cats" id="radio-cats"></input>
    <label class="categories-items categories-items-cats" for="radio-cats">Cats</label>

    <input type="radio" name="pets" class="categories-items-input categories-items-input-dogs" id="radio-dogs"></input>
    <label class="categories-items categories-items-dogs" for="radio-dogs">Dogs</label>

    <input type="radio" name="pets" class="categories-items-input categories-items-input-fishes" id="radio-fishes"></input>
    <label class="categories-items categories-items-fishes" for="radio-fishes">Fishes</label>

    <input type="radio" name="pets" class="categories-items-input categories-items-input-birds" id="radio-birds"></input>
    <label class="categories-items categories-items-birds" for="radio-birds">Birds</label>
    </aside>

    <div class="main__slider">
    <div class="main__filter">
    <div class="categories__filters">
    <label>Breed
    <input type="text" id="searchBar" class="filters-searchBar">
    </label>
    </div>
    </div>
    <div class='slider'></div>
  </div>
    `
    pageChoice.querySelector('.categories')
      .addEventListener('click', HangEvents.chooseCategory);
      pageChoice.querySelector('.filters-searchBar')
      .addEventListener('keyup', HangEvents.filterSearchBar);
    document.querySelector('.main__wrapper').appendChild(pageChoice);
  }
}
export class ViewFilterAll {
  static create() {
    const filters = document.createElement('div');
    filters.classList.add('categories__filters');
    filters.innerHTML += `
    <label>Breed
    <input type="text" id="searchBar" class="filters-searchBar">
    </label>
    `
    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', HangEvents.filterSearchBar);

    document.querySelector('.main__filter').appendChild(filters);
  }
} 
export class ViewFilterCat {
  static createPageChoice() {
    const filters = document.createElement('div');
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

    document.querySelector('.main__filter').appendChild(filters);
  }
}

export class ViewFilterDog {
  static createPageChoice() {
    const filters = document.createElement('div');
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
   </div>
   <div>
   <span class="extraFeature"> Specialization: </span>
    <label for="domastic">domastic</label>
    <input type="checkbox" id="domastic" class="e">
    <label for="decorate">decorate</label>
    <input type="checkbox" id="decorate" class="e">
    <label for="guard">guard</label>
    <input type="checkbox" id="guard" class="e">
    <label for="hunting">hunting</label>
    <input type="checkbox" id="hunting" class="e">
    </div>
    `
    filters.querySelector('.filters-searchBar')
    .addEventListener('keyup', HangEvents.filterSearchBar);
    document.querySelector('.main__filter').appendChild(filters);
    document.querySelector('.categories__filters')
      .addEventListener('click', HangEvents.filtersCheckbox);
  }
}

export class ViewFilterFish {
  static createPageChoice() {
    const filters = document.createElement('div');
    filters.classList.add('categories__filters');
    filters.innerHTML += `

    <label>Breed
    <input type="text" id="searchBar" class="filters-searchBar">
    </label>
    <div class="filters-checkbox">
    <label for="freshwater">freshwater</label>
    <input type="checkbox" id="freshwater" class="e">
    </div>
    <div>
    <span class="extraFeature">zonality: </span>
    <label for="up">up</label>
    <input type="checkbox" id="up" class="e">
    <label for="down">down</label>
    <input type="checkbox" id="down" class="e">
    <label for="mid">mid</label>
    <input type="checkbox" id="mid" class="e">
    </div>
    <div>
    <span class="extraFeature">color: </span>
    <label for="yellow">yellow</label>
    <input type="checkbox" id="yellow" class="e">
    <label for="grey">grey</label>
    <input type="checkbox" id="grey" class="e">
    <label for="blue">blue</label>
    <input type="checkbox" id="blue" class="e">
    <label for="red">red</label>
    <input type="checkbox" id="red" class="e">
    </div>
    `
  
    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', HangEvents.filterSearchBar);
    document.querySelector('.main__filter').appendChild(filters);
    document.querySelector('.categories__filters')
      .addEventListener('click', HangEvents.filtersCheckbox);
  }
}

export class ViewFilterBird {
  static createPageChoice() {
    const filters = document.createElement('div');
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
    </div>
    <div>
    <span class="extraFeature">color: </span>
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
    </div>
    
    `
   
    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', HangEvents.filterSearchBar);
    document.querySelector('.main__filter').appendChild(filters);
    document.querySelector('.categories__filters')
      .addEventListener('click', HangEvents.filtersCheckbox);
  }
}

class ViewHeader {
  static create() {
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML += `
    <div class="modalPurchaseBack"></div>
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
    <span><i class="goodsIntoCart"></i> item(s)</span>
    </div>
    <button class="btn-history">
    Purches History
  </button>
    </div>
    `
    document.querySelector('.root').appendChild(header);
    header.querySelector('.btn-history')
      .addEventListener('click', HangEvents.handlerHistory);
  }
}

class ViewMain {
  static create() {
    const main = document.createElement('main');
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
    const footer = document.createElement('footer');
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
    const startPage = document.createElement('div');
    startPage.classList.add('main__start-page');
    startPage.innerHTML += `
  

    <div class="main__start-page-block main__start-page-block--bird">
            <div class="main__start-page-block-img">
            <img src='assets/img/generic/papuga.jpg' class="main__start-page-block-img-item" alt="papu">
            </div>
          <div class="main__start-page-block-text">
          <h2 class="main__start-page-block-header">Birds of any breeds and colors</h2>
          <p class="main__start-page-block-subheader">Birds are extraordinarily pleasant 
          creatures. With their appearance, songs, lively bustle, they can decorate any home.</p>
          <button class="main__start-page-block-enterBtn">enter</button>
          </div>
          </div>

    <div class="main__start-page-block main__start-page-block--categories">
    <h2 class="main__start-page-block-header main__start-page-block-header--popular">Popular categories</h2>
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
    <button class="main__start-page-block-enterBtn">enter</button>
    </div>
  <div class="main__start-page-block-img">
  <img src="assets/img/generic/pug.jpg" class="main__start-page-block-img-item" alt="pug">
  </div>
</div>
    `
    document.querySelector('.main__wrapper').appendChild(startPage);
  }
}

export class ViewModalHistory{
  static create(){
    const history = document.createElement('div'),
    purchaseHistory = JSON.parse(localStorage.getItem("clientData"));
    /* let order =``; */
    
    document.querySelector('.main__history-modal') ? 
    document.querySelector('.main__history-modal').remove(): 0;
    
    history.classList.add('main__history-modal');
    if (purchaseHistory){ 
      purchaseHistory.forEach((purchase, i)=>{
        let order = ``;
       purchase.order.forEach((el)=>order +=`
       <div>
       <span>${el.type}</span> 
       <span>${el.name}</span> 
       <span>${el.orderAmount}</span>
       </div>`); 
        history.innerHTML += `
    <div class="main__history-modal-item">
    <p>${i+1}</p> 
    <span>${purchase.name}</span> 
    <span>${purchase.surname}</span>
    <div>
    ${order}
    </div>
    </div>
        `
      })
     }
    else {
      history.innerHTML += `
      There were no purchases yet.
      `
    }
    document.querySelector('.header').appendChild(history);
  }
}