 const salatLoaded = (response) => {
     return {
         type: 'SALAT_LOADED',
         payload: response
     }
 }

 const vegatablesLoaded = (response) => {
     return {
         type: 'VEGATABLES_LOADED',
         payload: response.vegetables
     }
 }

 const URLLoaded = (response) => {
     return {
         type: 'URL_LOADED',
         payload: response.imgUrl
        }
    }
    
    const meatLoaded = (response) => dispatch => {
        setTimeout(()=>{
           dispatch ({
               type: 'MEAT_LOADED',
               payload: response.meat
           })
        }, 1000)
    }
 export const salatFetchData = (url, action) => {
     return (dispatch) => {
         fetch(url)
             .then((response) => {
                 if (!response.ok) {
                     throw Error(response.statusText);
                 }
                 return response;
             })
             .then((response) => response.json())
             .then(response => dispatch(action(response)))
             .catch(() => console.log('Error'));
     };
 }
 export {
     salatLoaded,
     vegatablesLoaded,
     meatLoaded,
     URLLoaded
 };