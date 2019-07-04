import ControllerMain from './controller.js';

export const storage = {
    dataBase: [],
    filteredBase: [],
    subFilteredBase: [],
    filterParams: [],
    dictionary: {},
    count: 0,
    cartOrderAmount: (JSON.parse(localStorage.getItem("cartOrderAmount"))) ?
        JSON.parse(localStorage.getItem("cartOrderAmount")) : []
}
const controllerMain = new ControllerMain();

document.addEventListener('DOMContentLoaded', () => {
    controllerMain.init();
});

