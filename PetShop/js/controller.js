import ComposeSlider from './veiw.js';

export default class init {
    static init(container) {
       
        this.cs = new ComposeSlider(container);
        this.lang = 'en';
        this.cs.create(this.lang);
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
            init.cs.create(init.lang);
            break;
        };
        case 'prev': {

            init.cs.createPrev(init.lang)
            break;
        };
        }
    }
    static switchLang(e) {
        switch (e.target.innerText) {
            case 'РУССКИЙ': {
                init.lang = 'ru';
                init.cs.createWithAnotherLang(init.lang);
                break;
            };
        case 'ENGLISH': {
            init.lang = 'en';
            init.cs.createWithAnotherLang(init.lang);
            break;
        };
        case 'УКРАIНСЬКИЙ': {
            init.lang = 'ua';
            init.cs.createWithAnotherLang(init.lang);
            break;
        };
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