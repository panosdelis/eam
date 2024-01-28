import React from 'react';
import Topbar from './topbar';
import {Button,Button2} from './Button';
import { useNavigate } from 'react-router-dom';

const SecretaryMenu = () => {

  const navigate = useNavigate();

  const h1Style = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'Your Preferred Font, Arial, sans-serif',
  };

  const customContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const buttonTopStyle = {
    marginBottom: '5%',
  };

  const buttonRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15%',
    marginBottom: '5%',
  };

  const buttonRow2Style = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15%',
    marginBottom: '15%',
  };

  const firstButtonRowStyle = {
    ...buttonRowStyle,
    marginTop: '2%',
  };

  const buttonStyleCommon = {
    width: '20%',
    height: '50px',
    borderRadius: '50%',
    color: '#fff',
    cursor: 'pointer',
  };

  const buttonLeftStyle = {
    ...buttonStyleCommon,
    background: '#3498db',
    marginRight: '1%',
  };

  const buttonRightStyle = {
    ...buttonStyleCommon,
    background: '#3498db',
    marginLeft: '1%',
  };

  const buttonStyleMobile = {
    ...buttonStyleCommon,
    width: '40%', 
  };

  const screenWidth = window.innerWidth;

  return (
    <div>
      <Topbar />
      <div className="Title">
        <h1 style={h1Style}>Secretary Menu</h1>
      </div>
      <div className="container-fluid">
        <div className="col text-center">
          <div style={screenWidth < 600 ? buttonStyleMobile : firstButtonRowStyle}>
            <Button2 label="Button 2" style={buttonLeftStyle} onClick={() => navigate('/home')}/>
            <Button2 label="Button 3" style={buttonRightStyle} onClick={() => navigate('/home')} />
          </div>
          <div style={screenWidth < 600 ? buttonStyleMobile : buttonRow2Style}>
            <Button2 label="Button 4" style={buttonLeftStyle} onClick={() => navigate('/home')}/>
            <Button2 label="Button 5" style={buttonRightStyle} onClick={() => navigate('/home')}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretaryMenu;