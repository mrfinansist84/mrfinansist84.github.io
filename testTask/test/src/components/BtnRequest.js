import React from 'react';
import { connect } from 'react-redux'; 
import './css/BtnRequest.css';
import {  salatLoaded,
    vegatablesLoaded,
    meatLoaded,
    URLLoaded } from '../actions/index'; 


const BtnRequest = ({salat2Loaded, veg2Loaded, meat2Loaded, url2Loaded}) => {
const init = () => {
    salat2Loaded(); veg2Loaded(); meat2Loaded(); url2Loaded()
}
    return (
        <button className='button' onClick={init}>
            Generate salad of the day
    </button>
    );
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        salat2Loaded: () => dispatch(salatLoaded()),
        veg2Loaded: () => dispatch(vegatablesLoaded()),
        meat2Loaded: () => dispatch(meatLoaded()),
       url2Loaded: () => dispatch(URLLoaded()),
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