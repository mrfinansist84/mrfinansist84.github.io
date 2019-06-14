const initialState = {
    loading: false,
    salat: {
        id:0,
        name: 'Click the button',
    },
    vegetables:['Click the button'],
    meat: 'Click the button',
    url:'./img/salat.jpg'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SALAT_LOADED':
            return {
                ...state,
                loading: true,
                salat: action.payload
            };
            case 'VEGATABLES_LOADED':
            return {
                ...state,
                loading: true,
                vegetables: action.payload
            };
            case 'MEAT_LOADED':
            return {
                ...state,
                loading: true,
                meat: action.payload
            };
            case 'URL_LOADED':
            return {
                ...state,
                loading: false,
                url: action.payload
            };
            default:
                return state;
    }
};

export default reducer;