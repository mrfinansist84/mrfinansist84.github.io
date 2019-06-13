import React from 'react';
import './css/InfoDashboard.css';
import ImgSalat from './ImgSalat';
import TextSalat from './TextSalat';
import Spinner from './Spinner';

const InfoDashboard = () => {
     
    return (
        <div>
            <ImgSalat />
            <TextSalat />
            <Spinner />
        </div>
    );
}

export default InfoDashboard;
