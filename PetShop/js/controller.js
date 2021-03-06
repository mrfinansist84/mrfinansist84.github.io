import {
  LaunchView,
  ViewPopupEnough,
  ViewCart,
  ViewModalPurchase,
  ViewFilterCat,
  ViewFilterDog,
  ViewFilterFish,
  ViewFilterBird,
  ViewFilterAll,
  ViewModalHistory
} from './view.js';
import {
  dataForRendiring
} from './model.js';







/* export default class HangEvents {
    listeners() {
    this.isShow = false;
    const btnContainer = document.querySelector('.language');
    btnContainer.addEventListener('click', this.switchLang);

    const container = document.querySelector('.slider');
    container.addEventListener('click', this.showInfo);

    const cartttt = document.querySelector('.cartttt');
    cartttt.addEventListener('click', this.showCart);

    const orderControls = document.querySelector('.slider');
    orderControls.addEventListener('click', this.handlerCart);

    document.querySelector('.goodsIntoCart').innerText = dataForRendiring.cartOrderAmount.length;
  }

    showCart() {
    document.querySelector('.CartCart').classList.toggle("showCart");
  }
 */
export default class ControllerHangEvents {
    toggleSliderItem(e) {
    switch (e.target.innerText) {
      case 'next': {
        LaunchView.cs.createNext(LaunchView.lang, dataForRendiring.filterContainer, dataForRendiring.count);
        break;
      };
    case 'prev': {
      LaunchView.cs.createPrev(LaunchView.lang, dataForRendiring.filterContainer, dataForRendiring.count)
      break;
    };
    }
  }
    switchLang(e) {
    switch (e.target.innerText) {
      case 'РУССКИЙ': {
        LaunchView.lang = 'ru';
        LaunchView.cs.createWithAnotherLang(LaunchView.lang, dataForRendiring.filterContainer, dataForRendiring.count);
        break;
      };
    case 'ENGLISH': {
      LaunchView.lang = 'en';
      LaunchView.cs.createWithAnotherLang(LaunchView.lang, dataForRendiring.filterContainer, dataForRendiring.count);
      break;
    };
    case 'УКРАIНСЬКИЙ': {
      LaunchView.lang = 'ua';
      LaunchView.cs.createWithAnotherLang(LaunchView.lang, dataForRendiring.filterContainer, dataForRendiring.count);
      break;
    };
   
  }
}

    handlerCart(e) {
    let check = true,
      data = dataForRendiring.container,
      cart = dataForRendiring.cartOrderAmount;

    switch (e.target.innerText) {
      case '-': {
        cart.forEach((el, i) => {
          if (el.id == e.target.dataset.id) {
            el.orderAmount--;
            data[el.id - 1].orderAmount = el.orderAmount;
            el.orderAmount === 0 ? cart.splice(i, 1) : 0;
            e.target.parentElement.querySelector(".order-amount").innerText = el.orderAmount;
            document.querySelector('.CartCart').remove();
            ViewCart.buildCart();
            document.querySelector('.goodsIntoCart').innerText = cart.length;
            localStorage.setItem("cartOrderAmount", JSON.stringify(cart));
            localStorage.setItem("container", JSON.stringify(data));
          }
        });
        break;
      };

    case '+': {
      cart.forEach((el) => {
        if (el.id == e.target.dataset.id) {
          if (el.orderAmount == el.quantity) {
            ViewPopupEnough.showPopup(e.target)
          } else if (el.quantity <= 0) {
            ViewPopupEnough.showPopup(e.target)
          } else {
            el.orderAmount++;
          }
          data[el.id - 1].orderAmount = el.orderAmount;
          check = false;
          e.target.parentElement.querySelector(".order-amount").innerText = el.orderAmount;
          document.querySelector('.goodsIntoCart').innerText = cart.length;
          localStorage.setItem("cartOrderAmount", JSON.stringify(cart));
          localStorage.setItem("container", JSON.stringify(data));

        }
      });

      if (check) {
        data.forEach((el) => {
          if (el.id == e.target.dataset.id) {
            if (el.orderAmount == el.quantity) {
              ViewPopupEnough.showPopup(e.target)
            } else if (data.quantity === 0) {
              ViewPopupEnough.showPopup(e.target)
            } else {
              el.orderAmount++;
              cart.push(el);
            }


            e.target.parentElement.querySelector(".order-amount").innerText = el.orderAmount;
            document.querySelector('.goodsIntoCart').innerText = cart.length;
            localStorage.setItem("cartOrderAmount", JSON.stringify(cart));
            localStorage.setItem("container", JSON.stringify(data));
          }
        })
      }
      document.querySelector('.CartCart').remove();
      ViewCart.buildCart();
    }
    break;
    };
  }
    purchaseGoods() {
    ViewModalPurchase.buildModalPurchase();
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
        order: dataForRendiring.cartOrderAmount
      };
      let purchaseHistory = [];

    if (localStorage.getItem("clientData")) {
      purchaseHistory = JSON.parse(localStorage.getItem("clientData"));
    };
    
    purchaseHistory.push(clientData);
    localStorage.setItem("clientData", JSON.stringify(purchaseHistory));
    dataForRendiring.cartOrderAmount.forEach((order) => {
      dataForRendiring.container.forEach((data) => {
        if (order.id === data.id) {
          data.quantity = data.quantity - order.orderAmount;
          data.orderAmount = 0;
        }
      })
    })
    dataForRendiring.cartOrderAmount = [];
    localStorage.setItem("cartOrderAmount", JSON.stringify(dataForRendiring.cartOrderAmount));
    localStorage.setItem("container", JSON.stringify(dataForRendiring.container));
    document.querySelector('.goodsIntoCart').innerText = dataForRendiring.cartOrderAmount.length;
    document.querySelector('.modalPurchase').remove();
    document.querySelector('.CartCart').remove();
    ViewCart.buildCart();
    document.querySelector('.modalPurchaseBack').classList.remove('modalPurchaseBack-show');
    LaunchView.cs.createWithAnotherLang(LaunchView.lang, dataForRendiring.filterContainer);
    ViewModalHistory.create(); 
  }

    chooseCategory(e) {
    switch (true) {
      case (e.target.classList.value.includes('all')): {
        document.body.querySelector('.main__filter').innerHTML = "";
        dataForRendiring.filterContainer = dataForRendiring.container;
        dataForRendiring.count = 0;
        ViewFilterAll.create();
        LaunchView.cs.create(LaunchView.lang, dataForRendiring.filterContainer);
        break;
      }
      case (e.target.classList.value.includes('cats')): {
        HangEvents.chooseCategoryWorker('cat');
        ViewFilterCat.createPageChoice();
        break;
      }
      case (e.target.classList.value.includes('dogs')): {
        HangEvents.chooseCategoryWorker('dog');
        ViewFilterDog.createPageChoice();
        break;
      }
      case (e.target.classList.value.includes('fishes')): {
        HangEvents.chooseCategoryWorker('fish');
        ViewFilterFish.createPageChoice();
        break;
      }
      case (e.target.classList.value.includes('birds')): {
        HangEvents.chooseCategoryWorker('bird');
        ViewFilterBird.createPageChoice();
        break;
      }
    }
  }

    chooseCategoryWorker(type) {
    document.body.querySelector('.main__filter').innerHTML = "";
    dataForRendiring.filterContainer = dataForRendiring.container
      .filter((el) => el.type == type);
    dataForRendiring.count = 0;
    LaunchView.cs.create(LaunchView.lang, dataForRendiring.filterContainer);
  }

    filtersCheckbox(e) {
    if (e.target.checked) {
      dataForRendiring.filterParams.push(e.target.id);
    } else {
      dataForRendiring.filterParams = dataForRendiring.filterParams
        .filter((el) => el != e.target.id);
    }
    dataForRendiring.subFilterContainer = dataForRendiring.filterContainer
      .filter((el) => HangEvents.filtersCheckboxWorker(el));
    dataForRendiring.count = 0;
    LaunchView.cs.create(LaunchView.lang, dataForRendiring.subFilterContainer);

  }
    filtersCheckboxWorker(el) {
    let res = 0;
    dataForRendiring.filterParams.forEach((param) => {
      el[param] ? res++ : 0;
      if (typeof el[param] !== "boolean") {
        Object.values(el).join('').includes(param) ? res++ : 0
      };
    })
    return res === dataForRendiring.filterParams.length;
  }


    filterSearchBar(e) {
    dataForRendiring.subFilterContainer = dataForRendiring.filterContainer
      .filter((el) => el.name.toLowerCase().includes(e.target.value.toLowerCase()));
    dataForRendiring.count = 0;
    LaunchView.cs.create(LaunchView.lang, dataForRendiring.subFilterContainer);
  }

    handlerEnter(e) {
    if (e.target.classList.value.includes('enterBtn')) {
      document.querySelector('.main__wrapper').innerHTML = '';
      LaunchView.rendering(dataForRendiring.container);
    }
  }
    modalClose() {
    document.querySelector('.modalPurchase').remove();
    document.querySelector('.CartCart').classList.toggle("showCart");
    document.querySelector('.modalPurchaseBack').classList.remove('modalPurchaseBack-show');
  }
  
    handlerHistory(){
    document.querySelector('.main__history-modal').classList.toggle("main__history-modal--show");
  }
}