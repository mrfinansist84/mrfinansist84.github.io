import React from 'react';
import './css/ImgSalat.css';
import { connect } from 'react-redux';

const ImgSalat = ({url}) => {
    return (
        <img src={url} alt='salatImg' className='app__img'/>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state,
        loading: state.loading,
        url: state.url,
    }
}

export default connect(mapStateToProps)(ImgSalat); 

