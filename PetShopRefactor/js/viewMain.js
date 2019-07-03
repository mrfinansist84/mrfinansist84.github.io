import {ViewInitPage} from "./view.js"

export default class ViewMain {
    constructor(){
        this.viewInitPage = new ViewInitPage();
     
    }
  /*   init(){
    } */
    addListener(targerEl, event, handler) {
      document.querySelector(targerEl).addEventListener(event, handler);
    }
  }
  
  export const viewMain = new ViewMain;