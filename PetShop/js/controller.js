import LaunchView from './veiw.js';

export default class HangEvents {    
    static listeners() {
        const btnContainer = document.querySelector('.language');
        btnContainer.addEventListener('click', this.switchLang);

        const container = document.querySelector('.grid-container');
        container.addEventListener('click', this.showInfo);
    }
    static showInfo(e) {
        switch (e.target.innerText) {
        case 'next': {
          LaunchView.cs.create(LaunchView.lang);
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