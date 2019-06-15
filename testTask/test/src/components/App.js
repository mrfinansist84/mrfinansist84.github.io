import React from 'react';
import './css/app.css';
import BtnRequest from './BtnRequest';
import InfoDashboard from './InfoDashboard';


const App = () => {
  
  return (
    <div className="app">
      <BtnRequest />
      <InfoDashboard />
    </div>
  );
}

export default App;
