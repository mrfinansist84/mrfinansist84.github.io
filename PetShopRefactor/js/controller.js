import View from './view.js';
import Model from './model.js';
 import {
  storage
} from './main.js'; 

export default class ControllerMain {
  constructor() {
    this.lang = "En";
    this.isShow = false;
    this.view = new View(this);
    this.model = new Model();
  }
  init() {
    this.model.getDataFromServer(storage);
    this.model.getDictionaryFromServer(storage, this.lang);
    this.controllermakeStartPage();
  }

  controllermakeStartPage() {
    this.view.viewHeaderSection();
    this.view.viewMainSection();
    this.view.viewFooterSection();
    this.view.viewStartPageSection();
    this.view.viewCreateCart();
    this.view.viewModalHistory();
  }

  controllerMakeSliderPage() {
    this.view.viewPageChoice();
    this.view.viewComposeSlider();
  }

  handlerEnter(e) {
    if (e.target.classList.value.includes('enterBtn')) {
      this.controllerMakeSliderPage();
    }
  }

  makeVisibleCart() {
    document.querySelector('.CartCart').classList.toggle("showCart");
  }

  leafSliders(e) {
    switch (e.target.innerText) {
      case 'next': {
        this.view.createNext(); 
        /* переписать это метод контроллера. 
        Манипуляции с storage.count производить в модели */
        break;
      };
    case 'prev': {
      this.view.createPrev()
       /* переписать это метод контроллера. 
        Манипуляции с storage.count производить в модели */
      break;
    };
    }
  }
  switchLang(e) {
    switch (e.target.innerText) {
      case 'РУССКИЙ': {
        this.lang = 'Ru';
        this.view.createWithAnotherLang();
        break;
      };
    case 'ENGLISH': {
      this.lang = 'En';
      this.view.createWithAnotherLang();
      break;
    };
    case 'УКРАIНСЬКИЙ': {
      this.lang = 'Ua';
      this.view.createWithAnotherLang();
      break;
    };

    }
  }
  handlerCart(e) {
    let check = true;
    /*  data = dataForRendiring.dataBase,
     cart = dataForRendiring.cartOrderAmount; */

    switch (e.target.innerText) {
      case '-': {
        storage.cartOrderAmount.forEach((el, i) => {
          
          if (el.id == e.target.dataset.id) {
            el.orderAmount--;
            storage.dataBase[el.id - 1].orderAmount = el.orderAmount;
            e.target.parentElement.querySelector(".order-amount").innerText = el.orderAmount;
            el.orderAmount === 0 ? storage.cartOrderAmount.splice(i, 1) : 0;
           /*  document.querySelector('.CartCart').remove(); */
            this.view.viewCreateCart();

            localStorage.setItem("cartOrderAmount", JSON.stringify(storage.cartOrderAmount));
            localStorage.setItem("dataBase", JSON.stringify(storage.dataBase));
          }
        });
        console.log(storage.cartOrderAmount)
        break;
      };

    case '+': {
      storage.cartOrderAmount.forEach((el) => {
        console.log(el.id, e.target.dataset.id)
        if (el.id == e.target.dataset.id) {
          if (el.orderAmount == el.quantity) {
            this.view.viewPopupEnough(e.target)
          } else if (el.quantity <= 0) {
            this.view.viewPopupEnough(e.target)
          } else {
            el.orderAmount++;
          }
          storage.dataBase[el.id - 1].orderAmount = el.orderAmount;
          check = false;
          e.target.parentElement.querySelector(".order-amount").innerText = el.orderAmount;
          localStorage.setItem("cartOrderAmount", JSON.stringify(storage.cartOrderAmount));
          localStorage.setItem("dataBase", JSON.stringify(storage.dataBase));
          console.log(storage.cartOrderAmount)
        }
      });

      if (check) {
        storage.dataBase.forEach((el) => {
          if (el.id == e.target.dataset.id) {
            if (el.orderAmount == el.quantity) {
              this.view.viewPopupEnough(e.target)
            } else if (storage.dataBase.quantity === 0) {
              this.view.viewPopupEnough(e.target)
            } else {
              el.orderAmount++;
              storage.cartOrderAmount.push(el);
              console.log(storage.cartOrderAmount)
            }
            e.target.parentElement.querySelector(".order-amount").innerText = el.orderAmount;
            document.querySelector('.goodsIntoCart').innerText = storage.cartOrderAmount.length;
            localStorage.setItem("cartOrderAmount", JSON.stringify(storage.cartOrderAmount));
            localStorage.setItem("dataBase", JSON.stringify(storage.dataBase));
          }
        })
      }
    /*  document.querySelector('.CartCart').remove();  */
      this.view.viewCreateCart();
    }
    break;
    };
  }
  purchaseGoods() {
    this.viewModalPurchase.buildModalPurchase();
    document.querySelector('.modalPurchaseBack').classList.add('modalPurchaseBack-show');
    const form = document.querySelector('.modalPurchase__form'),
      clientData = JSON.parse(localStorage.getItem("clientData"));
    if (clientData) {
      form[0].value = clientData[clientData.length - 1].name;
      form[1].value = clientData[clientData.length - 1].surname;
      form[2].value = clientData[clientData.length - 1].email;
      form[3].value = clientData[clientData.length - 1].tel;
    }
  }

  confirmOrder() {
    const form = document.querySelector('.modalPurchase__form'),
      clientData = {
        name: form[0].value,
        surname: form[1].value,
        email: form[2].value,
        tel: form[3].value,
        order: storage.cartOrderAmount
      };
    let purchaseHistory = [];

    if (localStorage.getItem("clientData")) {
      purchaseHistory = JSON.parse(localStorage.getItem("clientData"));
    };

    purchaseHistory.push(clientData);
    localStorage.setItem("clientData", JSON.stringify(purchaseHistory));
    storage.cartOrderAmount.forEach((order) => {
      storage.dataBase.forEach((data) => {
        /* возможно просто находить idшки без второго перебора */
        if (order.id === data.id) {
          data.quantity = data.quantity - order.orderAmount;
          data.orderAmount = 0;
        }
      })
    })
    storage.cartOrderAmount = [];
    localStorage.setItem("cartOrderAmount", JSON.stringify(storage.cartOrderAmount));
    localStorage.setItem("dataBase", JSON.stringify(storage.dataBase));
    document.querySelector('.goodsIntoCart').innerText = storage.cartOrderAmount.length;
    document.querySelector('.modalPurchase').remove();
    document.querySelector('.CartCart').remove();
    this.view.viewBuildCart();
    document.querySelector('.modalPurchaseBack').classList.remove('modalPurchaseBack-show');
    this.view.viewComposeSlider();
    this.view.viewModalHistory();
  }

  chooseCategory(e) {
    switch (true) {
      case (e.target.classList.value.includes('all')): {
        storage.filteredBase = storage.dataBase;
        storage.count = 0;
        this.view.viewFilterAll();
        this.view.viewComposeSlider();
        break;
      }
      case (e.target.classList.value.includes('cats')): {
        this.chooseCategoryWorker('cat');
        this.view.viewFilterCat();
        break;
      }
      case (e.target.classList.value.includes('dogs')): {
        this.chooseCategoryWorker('dog');
        this.view.viewFilterDog();
        break;
      }
      case (e.target.classList.value.includes('fishes')): {
        this.chooseCategoryWorker('fish');
        this.view.viewFilterFish();
        break;
      }
      case (e.target.classList.value.includes('birds')): {
        this.chooseCategoryWorker('bird');
        this.view.viewFilterBird();
        break;
      }
    }
  }

  chooseCategoryWorker(type) {
    storage.filteredBase = storage.dataBase
      .filter((el) => el.type == type);
    storage.count = 0;
    this.view.viewComposeSlider();
  }

  filtersCheckbox(e) {
    if (e.target.checked) {
      storage.filterParams.push(e.target.id);
    } else {
      storage.filterParams = storage.filterParams
        .filter((el) => el != e.target.id);
    }
    storage.subfilteredBase = storage.filteredBase
      .filter((el) => this.filtersCheckboxWorker(el));
    storage.count = 0;
    this.view.viewComposeSlider();

  }
  filtersCheckboxWorker(el) {
    let res = 0;
    storage.filterParams.forEach((param) => {
      el[param] ? res++ : 0;
      if (typeof el[param] !== "boolean") {
        Object.values(el).join('').includes(param) ? res++ : 0
      };
    })
    return res === storage.filterParams.length;
  }


  filterSearchBar(e) {
    storage.subfilteredBase = storage.filteredBase
      .filter((el) => el.name.toLowerCase().includes(e.target.value.toLowerCase()));
    storage.count = 0;
    this.viewInitPageSlider.cs.create(this.viewInitPageSlider.lang, storage.subfilteredBase);
  }

  
  modalClose() {
    document.querySelector('.modalPurchase').remove();
    document.querySelector('.CartCart').classList.toggle("showCart");
    document.querySelector('.modalPurchaseBack').classList.remove('modalPurchaseBack-show');
  }

  handlerHistory() {
    document.querySelector('.main__history-modal').classList.toggle("main__history-modal--show");
  }
}