const salatLoaded = (newSalat) => {
    return {
        type: 'SALAT_LOADED',
        payload: newSalat
    };
};

export {
    salatLoaded
};