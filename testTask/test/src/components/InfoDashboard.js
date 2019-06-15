import React from 'react';
import './css/InfoDashboard.css';
import ImgSalat from './ImgSalat';
import TextSalat from './TextSalat';


const InfoDashboard = () => {
     
    return (
        <div className='app__infoDashboard'>
            <ImgSalat />
            <TextSalat />
        </div>
    );
}

export default InfoDashboard;
