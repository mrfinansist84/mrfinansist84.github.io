import ComposeSlider from './veiw.js';
import { p } from './model.js';
import GetStart from './model.js'

export default class init {
    constructor() {
    }
    static init(container) {
        let count = 0;
        this.cs = new ComposeSlider(container, count);
        this.cs.create();
        this.listeners();
    }

    static listeners() {
        const btnContainer = document.querySelector('.language');
        btnContainer.addEventListener('click', this.switchLang);

        const container = document.querySelector('.grid-container');
        container.addEventListener('click', this.showInfo);
    }
    static showInfo(e) {
        switch (e.target.innerText) {
            case 'More info': {
                e.target.previousSibling.previousSibling.classList.toggle('addInfo');
                break;
            };
        case 'next': {
            init.cs.create();
            break;
        };
        case 'prev': {
            init.cs.createPrev()
            break;
        };
        }
    }
    static switchLang(e) {
        switch (e.target.innerText) {
            case 'РУССКИЙ': {
                p.translate('RU')
            };
            break;
        case 'ENGLISH': {
            p.translate('EN')
        };
        break;
        }
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