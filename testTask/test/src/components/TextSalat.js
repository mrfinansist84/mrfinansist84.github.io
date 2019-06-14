import React from 'react';
import './css/TextSalat.css';
import { connect } from 'react-redux'
import Spinner from './Spinner';

const TextSalat = ({ salat, vegetables, meat, loading }) => {
    const text = (<div>
        <p>name: {salat.name}</p>
        <p>vegetables: {vegetables.join(',')}</p>
        <p>meat: {meat}</p>
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
