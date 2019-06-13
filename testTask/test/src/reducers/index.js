const initialState = {
    salat: {
        id:1,
        name: 'SALALAALALA',
        vegetables:[1,2,3],
        meat: 'MEAT111',
        url:'./img/salat.jpg'
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SALAT_LOADED':
            return {
                salat: action.payload
            }
            default:
                return state;
    }
};

export default reducer;