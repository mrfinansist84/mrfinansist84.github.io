import React from 'react';
import { connect } from 'react-redux';
import './css/BtnRequest.css';
import {
    salatFetchData, salatLoaded,
    vegatablesLoaded,
    meatLoaded,
    URLLoaded
} from '../actions/index';


const BtnRequest = ({salat2Loaded, veg2Loaded, meat2Loaded, url2Loaded}) => {
const init = () => {
    salat2Loaded(); veg2Loaded(); meat2Loaded();url2Loaded(); 
}
    return (
        <button className='app__btn' onClick={init}>
            Generate salad of the day
    </button>
    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        salat2Loaded: 
        () => dispatch(salatFetchData("http://localhost:3001/saladOfTheDay", salatLoaded)),
        veg2Loaded: 
        () => dispatch(salatFetchData("http://localhost:3001/vegetables/1", vegatablesLoaded)),
        meat2Loaded: 
        () => dispatch(salatFetchData("http://localhost:3001/meat/1", meatLoaded)),
       url2Loaded: 
       () => dispatch(salatFetchData("http://localhost:3001/saladImageGenerator", URLLoaded)),
    };
};
const mapStateToProps = (state) => {

    return {
        loading: state.loading,
        salat: state.salat,
        vegetables: state.vegetables,
        meat: state.meat,

    }}

export default connect(mapStateToProps, mapDispatchToProps)(BtnRequest); 