import init from './controller.js';

export default class getStart {
    constructor(){
        
    }
    static getData(url = 'js/dataBaseEn.json'){
        fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            init.init(data)
        })}
    
}

getStart.getData();