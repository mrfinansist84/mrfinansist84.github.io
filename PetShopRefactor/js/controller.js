import View from './view.js';
import Model from './model.js';

export default class ControllerMain {
  constructor() {
    this.lang = "En";
    this.isShow = false;
    this.view = new View(this);
    this.model = new Model(this);
  }
  init() {
    this.model.getDataFromServer();

  }

  controllermakeStartPage() {
    this.view.viewHeaderSection(this.model);
    this.view.viewMainSection();
    this.view.viewFooterSection();
    this.view.viewStartPageSection();
    this.view.viewCreateCart(this.model);
    this.view.viewModalHistory();
  }

  handlerEnter(e) {
    if (e.target.classList.value.includes('enterBtn')) {
      this.model.getDictionaryFromServer(this.lang);
    }
  }

  controllerMakeSliderPage() {
    this.model.getDataBaseWithoutFilters();
    this.view.viewPageChoice();
    this.view.viewComposeSlider(this.model.filteredBase,this.model.count, this.model.dictionary);
  }

  leafSliders(e) {
    switch (e.target.innerText) {
      case 'next': {
        this.model.changeDataBaseForLeafSliderNext()
        this.view.viewComposeSlider(this.model.filteredBase,this.model.count, this.model.dictionary);
        break;
      };
    case 'prev': {
      this.model.changeDataBaseForLeafSliderPrev()
      this.view.viewComposeSlider(this.model.filteredBase,this.model.count, this.model.dictionary);
      break;
    };
    }
  }

  switchLang(e) {
    const lang = e.target.innerText,
      supportedLang = [{
          lang: 'Ru',
          name: 'РУССКИЙ'
        },
        {
          lang: 'En',
          name: 'ENGLISH'
        },
        {
          lang: 'Ua',
          name: 'УКРАIНСЬКИЙ'
        }
      ];
    supportedLang.forEach((el) => {
      el.name === lang ?
        this.model.getDictionaryFromServer(el.lang) : 0;
    })
  }
  updateOrderAmount(e, el) {
    this.view.renderOrderAmount(e, el);
  }
  addPopUpEmotyStop(target) {
    this.view.viewPopupEnough(target)
  }
  handlerCart(e) {
    if (e.target.innerText == '-') {
      this.model.delUnitFromCart(e);
    }

    if (e.target.innerText == '+') {
      this.model.cartOrderAmount.find((el) => el.id == e.target.dataset.id) ?
        this.model.updateUnitInCart(e) :
        this.model.addUnitInCart(e);
    }
    this.model.setToLocalStorage("cartOrderAmount", this.model.cartOrderAmount);
    this.model.setToLocalStorage("dataBase", this.model.dataBase);
    this.view.viewCreateCart(this.model);
  }

  purchaseGoods() {
    this.view.viewModalPurchase();
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
      /* модель */
      clientData = {
        /* модель */
        name: form[0].value,
        surname: form[1].value,
        email: form[2].value,
        tel: form[3].value,
        order: this.model.cartOrderAmount
      };
    console.log(this.model.cartOrderAmount)
    let purchaseHistory = [];

    if (this.model.getFromLocalStorage("clientData")) {
      /* модель */
      purchaseHistory = this.model.getFromLocalStorage("clientData");
    };

    purchaseHistory.push(clientData); /* модель */

    this.model.cartOrderAmount.forEach((order) => {
      /* модель */
      this.model.dataBase.forEach((data) => {
        /* сделать через find */
        if (order.id === data.id) {
          /* модель */
          data.quantity = data.quantity - order.orderAmount;
          data.orderAmount = 0;
        }
      })
    })
    this.model.cartOrderAmount = []; /* модель */



    this.model.setToLocalStorage("clientData", purchaseHistory);
    this.model.setToLocalStorage("cartOrderAmount", this.model.cartOrderAmount);
    this.model.setToLocalStorage("dataBase", this.model.dataBase);
    this.view.viewCreateCart(this.model);
    this.view.viewComposeSlider(this.model.filteredBase,this.model.count, this.model.dictionary);
    this.view.viewModalHistory();
    this.view.viewModalClose();

  }

  chooseCategory(e) {
    switch (true) {
      case (e.target.classList.value.includes('all')): {
        storage.filteredBase = storage.dataBase;
        storage.count = 0;
        this.view.viewFilterAll();
        this.view.viewComposeSlider(this.model.filteredBase,this.model.count, this.model.dictionary);
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
    this.model.filteredBase = this.model.dataBase
      .filter((el) => el.type == type);
    this.model.count = 0;
    this.view.viewComposeSlider(this.model.filteredBase,this.model.count, this.model.dictionary);
  }

  filtersCheckbox(e) {
    if (e.target.checked) {
      this.model.filterParams.push(e.target.id);
    } else {
      this.model.filterParams = this.model.filterParams
        .filter((el) => el != e.target.id);
    }

    this.model.subfilteredBase = this.model.filteredBase.filter((el) => this.filtersCheckboxWorker(el));
    this.model.count = 0;
    this.view.viewComposeSlider(this.model.subfilteredBase,this.model.count, this.model.dictionary);

  }
  filtersCheckboxWorker(el) {
    let res = 0;
    this.model.filterParams.forEach((param) => {
      el[param] ? res++ : 0;
      if (typeof el[param] !== "boolean") {
        Object.values(el).join('').includes(param) ? res++ : 0
      };
    })
    return res === this.model.filterParams.length;
  }

  filterSearchBar(e) {
    this.model.subfilteredBase = this.model.filteredBase
      .filter((el) => el.name.toLowerCase().includes(e.target.value.toLowerCase()));

    this.model.count = 0;
    this.view.viewComposeSlider(this.model.subfilteredBase,this.model.count, this.model.dictionary);
  }

  modalClose() {
    this.view.viewModalClose();
  }
}