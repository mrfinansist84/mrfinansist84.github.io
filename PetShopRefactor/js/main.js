import ControllerMain from './controller.js';

const controllerMain = new ControllerMain();

document.addEventListener('DOMContentLoaded', () => {
    controllerMain.init();
});

export default controllerMain;