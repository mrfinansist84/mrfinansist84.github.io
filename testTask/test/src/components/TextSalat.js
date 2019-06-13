import React from 'react';
import './css/TextSalat.css';
import { connect } from 'react-redux'

const TextSalat = ({ salat }) => {
  
    return (
        <div>
            <p>name: {salat.name}</p>
            <p>vegetables: {salat.vegetables.join(',')}</p>
            <p>meat: {salat.meat}</p>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        salat: state.salat
    }
}
export default connect(mapStateToProps)(TextSalat);
