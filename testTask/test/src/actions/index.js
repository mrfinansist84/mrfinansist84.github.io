const newSalat = {
    id: 1,
    name: 'Napolitana'
};
const newVegatable = ['tomatoes', 'cabbage'];
const newMeat = 'chicken';
const newUrl = 'url'

const salatLoaded = () => dispatch => {
    setTimeout(() => {
        dispatch({type: 'SALAT_LOADED', payload: newSalat})
    }, 500)
}

const vegatablesLoaded = () => dispatch => {
    setTimeout(() => {
        dispatch({type: 'VEGATABLES_LOADED', payload: newVegatable})
    }, 500)
}

const meatLoaded = ()=> dispatch => {
    setTimeout(() => {
        dispatch({type: 'MEAT_LOADED', payload: newMeat})
    }, 500)
}
  
const URLLoaded = () => dispatch => {
    setTimeout(() => {
        dispatch({type: 'URL_LOADED', payload: newUrl})
    }, 1000)
}

export const salatFetchData = (url) => {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch(() => console.log('Error'));
    };
} 
export {
    salatLoaded,
    vegatablesLoaded,
    meatLoaded,
    URLLoaded
};

