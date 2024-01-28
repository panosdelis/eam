import React from 'react';
import { Button, Button2, ButtonBar, IconButton } from './Button';
import backButtonIcon from './img/backButton.png';
import homeButtonIcon from './img/homeButton.png';
import infoButtonIcon from './img/infoButton.png';
import userButtonIcon from './img/userButton.png';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {

  const handleHomeButtonClick = () => {

    if (role == 'student') {
      navigate('/studentsmenu');
    } else if (role == 'teacher') {
      navigate('/teachersmenu');
    }
  };


  const handleBackButtonClick = () => {

    window.history.back();
  };

  

  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  return (
    <div className="Topbar">
      <div>
        <IconButton label="" iconSrc={backButtonIcon} onClick={handleBackButtonClick} style={{ width: '3rem', height: '3rem' }} labelStyle={{ fontSize: '1rem', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} />
        <IconButton label="" iconSrc={homeButtonIcon} onClick={handleHomeButtonClick} style={{ width: '3rem', height: '3rem' }} labelStyle={{ fontSize: '1rem', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} />
      </div>
      <div>
        <IconButton label="" iconSrc={infoButtonIcon} onClick={() => navigate('/coursesPage')} style={{ width: '3rem', height: '3rem' }} labelStyle={{fontSize: '1rem', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} />
        <IconButton label="" iconSrc={userButtonIcon} onClick={() => navigate('/user')} style={{ width: '3rem', height: '3rem' }} labelStyle={{ fontSize: '1rem', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }} />
      </div>
    </div>
  );
};

export default Topbar;
