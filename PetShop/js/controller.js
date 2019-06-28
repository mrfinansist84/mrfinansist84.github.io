import LaunchView, {
  ViewPopupEnough,
  ViewCart,
  ViewModalPurchase
} from './veiw.js';
import {
  dataForRendiring
} from './model.js';

export default class HangEvents {
  static listeners() {
    this.isShow = false;
    const btnContainer = document.querySelector('.language');
    btnContainer.addEventListener('click', this.switchLang);

    const container = document.querySelector('.grid-container');
    container.addEventListener('click', this.showInfo);

    const cartttt = document.querySelector('.cartttt');
    cartttt.addEventListener('click', this.showCart);

    document.querySelector('.goodsIntoCart').innerText = dataForRendiring.cartOrderAmount.length;
  }

  static showCart() {
    document.querySelector('.CartCart').classList.toggle("showCart");
  }

  static showInfo(e) {
    switch (e.target.innerText) {
      case 'next': {
        LaunchView.cs.createNext(LaunchView.lang);
        break;
      };
    case 'prev': {
      LaunchView.cs.createPrev(LaunchView.lang)
      break;
    };
    }
  }
  static switchLang(e) {
    switch (e.target.innerText) {
      case 'РУССКИЙ': {
        LaunchView.lang = 'ru';
        LaunchView.cs.createWithAnotherLang(LaunchView.lang);
        break;
      };
    case 'ENGLISH': {
      LaunchView.lang = 'en';
      LaunchView.cs.createWithAnotherLang(LaunchView.lang);
      break;
    };
    case 'УКРАIНСЬКИЙ': {
      LaunchView.lang = 'ua';
      LaunchView.cs.createWithAnotherLang(LaunchView.lang);
      break;
    };
    }
  }

  static handlerCart(e) {

    let check = true,
      data = dataForRendiring.container,
      cart = dataForRendiring.cartOrderAmount;

    switch (e.target.innerText) {
      case '-': {
        cart.forEach((el, i) => {
          if (el.id == e.target.dataset.id) {
            el.orderAmount--;
            data[el.id - 1].orderAmount = el.orderAmount;

            e.target.parentElement.querySelector(".order-amount").innerText = el.orderAmount;
            el.orderAmount === 0 ? cart.splice(i, 1) : 0;
            document.querySelector('.cartttt').children[0].remove();
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
          console.log(el.orderAmount, el.quantity, el.orderAmount == el.quantity)
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
      document.querySelector('.cartttt').children[0].remove();
      ViewCart.buildCart();
    }
    break;
    };
  }
  static purchaseGoods() {
    ViewModalPurchase.buildModalPurchase();
    const form = document.querySelector('.modalPurchase__form'),
      clientData = JSON.parse(localStorage.getItem("clientData"));
    if (clientData) {
      form[0].value = clientData.name;
      form[1].value = clientData.surname;
      form[2].value = clientData.email;
      form[3].value = clientData.tel;
    }
  }
  
  static confirmOrder() {
    const form = document.querySelector('.modalPurchase__form'),
      clientData = {
        name: form[0].value,
        surname: form[1].value,
        email: form[2].value,
        tel: form[3].value,
        order: dataForRendiring.cartOrderAmount
      };
    localStorage.setItem("clientData", JSON.stringify(clientData));
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
    document.querySelector('.cartttt').children[0].remove();
    ViewCart.buildCart();
    LaunchView.cs.createWithAnotherLang(LaunchView.lang);
  }

}



/* class EventObserver {
    constructor () {
      this.observers = []
    }
  
    subscribe (fn) {
      this.observers.push(fn)
    }
  
    unsubscribe (fn) {
      this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }
  
    broadcast (data) {
      this.observers.forEach(subscriber => subscriber(data))
    }
  }

  const blogObserver = new EventObserver()
  
  const btnContainer = document.querySelector('.language');
  const btnDet = document.querySelector('.detalies');

  btnContainer.addEventListener('click', ()=> {
    blogObserver.broadcast(btnDet);
  });

  const changeLangElements = (text) => {
    switch (text) {
        case 'РУССКИЙ': {
            btnDet = 'Больше инфы';
        };
        break;
    case 'ENGLISH': {
        btnDet = 'More info';
    };
    break;
    }
  }

  blogObserver.subscribe(btnDet => {
    btnDet.innerText = changeLangElements(btnDet.innerText)
  }); */