import React from 'react';
import './css/TextSalat.css';
import { connect } from 'react-redux'
import Spinner from './Spinner';

const TextSalat = ({ salat, vegetables, meat, loading }) => {
    const text = (<div className='app__infoDashboard-text'>
        <p className='app__infoDashboard-text-item'>name: {salat.name}</p>
        <p className='app__infoDashboard-text-item'>vegetables: {vegetables.join(',')}</p>
        <p className='app__infoDashboard-text-item'>meat: {meat}</p>
                  </div>),
        spinner = <Spinner />

    return loading ? spinner : text
}

const mapStateToProps = (state) => {

    return {
        loading: state.loading,
        salat: state.salat,
        vegetables: state.vegetables,
        meat: state.meat,
    }
}
export default connect(mapStateToProps)(TextSalat);
