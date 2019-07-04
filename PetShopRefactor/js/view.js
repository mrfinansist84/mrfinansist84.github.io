 import {
  storage
} from './main.js';


/* export class ViewInitPageSlider {
  constructor(control) {
    this.control = control;
  }
  rendering() {
    storage.filterContainer = storage.dataBase;
    this.control.viewPageChoice.createPageChoice();
    this.cs = new ViewComposeSlider(this.control);
    this.cs.create();
    document.querySelector('.CartCart').remove();
    this.control.viewCart.buildCart();
    this.control.viewModalHistory.create();
  }
} */

export default class View {
  constructor(control) {
    this.control = control; /* remove */
  }

  viewComposeSlider(data = storage.dataBase, count = storage.count) {
    const targetElem = document.querySelector('.slider');
    let parentDiv = document.createElement('div');
    storage.filteredBase = storage.dataBase;
    let dataLength = storage.filteredBase.length < 4 ? storage.filteredBase.length : 4;

    targetElem.innerHTML = '';
    parentDiv.classList.add('wrapp');
    parentDiv.innerHTML += `
    <button class="btn-slider btn-slider--prev">
    prev
    </button>`
    for (let i = 0; i < dataLength; i++) {
      if (storage.filteredBase[storage.count]) {
        parentDiv.appendChild(this.viewBuildCard(storage.filteredBase[storage.count]));
        storage.count < 19 ? storage.count++ : storage.count = 0;
        /* count++ */
      }
    }
    parentDiv.innerHTML += `
    <button class="btn-slider btn-slider--next">
    next
    </button>`
    /*  parentDiv.querySelector('.btn-slider').addEventListener('click', HangEvents.showInfo);  */
    targetElem.appendChild(parentDiv);
    targetElem.addEventListener('click', this.control.leafSliders.bind(this.control));
    targetElem.addEventListener('click', this.control.handlerCart.bind(this.control));
  }


  createWithAnotherLang() {
    storage.count = storage.count - 4 < 0 ?
      storage.count = 0 :
      storage.count - 4;
    this.viewComposeSlider();
  }

  createNext() {
    let data_ = storage.dataBase[0].id === 1 ?
      storage.dataBase :
      storage.dataBase.reverse();

    this.viewComposeSlider(data_);
  }

  createPrev() {
    let data_ = storage.dataBase[0].id === 1 ?
      storage.dataBase.reverse() :
      storage.dataBase;

    this.viewComposeSlider(data_);
  }

  viewChooseSpecialFeatureCard(goodsUnit) {
    let res = ``;

    for (let key in goodsUnit) {
      let values = ``;

      if (Array.isArray(goodsUnit[key])) {
        goodsUnit[key].forEach((el) => {
          values += `${storage.dictionary[el]} `
        })
      } else {
        values = Number.isNaN(+[goodsUnit[key]]) ?
          storage.dictionary[goodsUnit[key]] :
          goodsUnit[key];
      }

      if (key !== "name" &&
        key !== "id" &&
        key !== "url" &&
        key !== "type" &&
        key !== "price" &&
        key !== "orderAmount") {

        res += `<p>${storage.dictionary[key]} : ${values}</p>`
      }
    }
    return res;
  }

  viewBuildCard(goodsUnit) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    /*  cardDiv.setAttribute('id',`${goodsUnit.id}`); */
    cardDiv.innerHTML = `
                <div class="card-wrap">           
                <img src=${goodsUnit.url}>
                <div class="card-section">
                <h4>${storage.dictionary[goodsUnit.name]}</h4>
                <p>${goodsUnit.price}$</p>
                <div class="animalInfo">
                ${this.viewChooseSpecialFeatureCard(goodsUnit)}
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

  viewPopupEnough(element) {
    const popup = document.createElement('div');
    popup.classList.add('showPopup');
    popup.innerText = `Not enough goods in stock`;
    element.appendChild(popup);

    setTimeout(() => element.children[0].remove(), 1500);
  }

  viewCreateCart() {
    let totalCost = 0,
      popup = document.createElement('div');
    popup.classList.add('CartCart');

    if (storage.cartOrderAmount.length === 0) {

      popup.innerHTML = `<p>Nothing ordered</p>`

    } else {
      storage.cartOrderAmount.forEach((goodsUnit) => {
        totalCost += (goodsUnit.price * goodsUnit.orderAmount);
console.log(storage.dictionary)
        popup.innerHTML += `
        <div class="cart-item">
      <div>
      <img src=${goodsUnit.url} class="purches-img">
      </div>
      <div>
      <span class="purches-name">${storage.dictionary[goodsUnit.name]}</span>
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
      .addEventListener('click', this.control.purchaseGoods) : 0;
      document.querySelector('.header').appendChild(popup);
      document.querySelector('.goodsIntoCart').innerText = storage.cartOrderAmount.length;

  }

  viewModalPurchase() {
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
      .addEventListener('click', this.control.confirmOrder);
    document.querySelector('.modalPurchase__form-abort')
      .addEventListener('click', this.control.modalClose);
  }

  viewPageChoice() {
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
      .addEventListener('click', this.control.chooseCategory.bind(this.control));

    pageChoice.querySelector('.filters-searchBar')
      .addEventListener('keyup', this.control.filterSearchBar);

    document.querySelector('.main__wrapper').innerHTML = '';

    document.querySelector('.main__wrapper').appendChild(pageChoice);
  }

  viewFilterAll() {
    const filters = document.createElement('div');
    filters.classList.add('categories__filters');
    filters.innerHTML += `
    <label>Breed
    <input type="text" id="searchBar" class="filters-searchBar">
    </label>
    `
    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', this.control.filterSearchBar);
    document.querySelector('.main__filter').innerHTML = "";
    document.querySelector('.main__filter').appendChild(filters);
  }

  viewFilterCat() {
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
      .addEventListener('click', this.control.filtersCheckbox);

    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', this.control.filterSearchBar);
    document.querySelector('.main__filter').innerHTML = "";
    document.querySelector('.main__filter').appendChild(filters);
  }

  viewFilterDog() {
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
      .addEventListener('keyup', this.control.filterSearchBar);

    document.querySelector('.categories__filters')
      .addEventListener('click', this.control.filtersCheckbox);

    document.querySelector('.main__filter').innerHTML = "";

    document.querySelector('.main__filter').appendChild(filters);
  }

  viewFilterFish() {
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
      .addEventListener('keyup', this.control.filterSearchBar);

    document.querySelector('.categories__filters')
      .addEventListener('click', this.control.filtersCheckbox);

    document.querySelector('.main__filter').innerHTML = "";

    document.querySelector('.main__filter').appendChild(filters);
  }


  viewFilterBird() {
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
    </div> `
    filters.querySelector('.filters-searchBar')
      .addEventListener('keyup', this.control.filterSearchBar);

    document.querySelector('.categories__filters')
      .addEventListener('click', this.control.filtersCheckbox);

    document.querySelector('.main__filter').innerHTML = "";

    document.querySelector('.main__filter').appendChild(filters);
  }

  viewHeaderSection() {
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
      .addEventListener('click', this.control.handlerHistory);
    document.querySelector('.language').addEventListener('click', this.control.switchLang);
    document.querySelector('.cartttt').addEventListener('click', this.control.makeVisibleCart);
    document.querySelector('.goodsIntoCart').innerText = storage.cartOrderAmount.length;
  }

  viewMainSection() {
    const main = document.createElement('main');
    main.classList.add('main');
    main.innerHTML += `
    <div class="main__wrapper">
    </div>
    `
    document.querySelector('.root').appendChild(main);
    document.querySelector('.main__wrapper')
      .addEventListener('click', this.control.handlerEnter.bind(this.control));
  }

  viewFooterSection() {
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

  viewStartPageSection() {
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

  viewModalHistory() {
    const history = document.createElement('div'),
      purchaseHistory = JSON.parse(localStorage.getItem("clientData"));
    /* let order =``; */

    document.querySelector('.main__history-modal') ?
      document.querySelector('.main__history-modal').remove() : 0;

    history.classList.add('main__history-modal');
    if (purchaseHistory) {
      purchaseHistory.forEach((purchase, i) => {
        let order = ``;
        purchase.order.forEach((el) => order += `
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
    } else {
      history.innerHTML += `
      There were no purchases yet.
      `
    }
    document.querySelector('.header').appendChild(history);
  }
}