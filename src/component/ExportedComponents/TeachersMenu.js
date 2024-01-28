import React from 'react';
import Topbar from './topbar';
import { Button, Button2 } from './Button';
import { useNavigate } from 'react-router-dom';

const TeachersMenu = () => {

  const navigate = useNavigate();

  const h1Style = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'Your Preferred Font, Arial, sans-serif',
  };

  const buttonRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20%',
    marginBottom: '5%',
    marginTop: '15%',
    margin: '10%',
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
        <h1 style={h1Style}>Teachers Menu</h1>
      </div>
      <div className="container-fluid">
        <div className="col text-center">
          <div style={screenWidth < 600 ? buttonStyleMobile : firstButtonRowStyle}>
            <Button2 label="Πληροφορίες" style={buttonLeftStyle} onClick={() => navigate('/teachersInfo')} />
            &ensp;&emsp;
            <Button2 label="Νεο Βαθμολόγιο" style={buttonRightStyle} onClick={() => navigate('/GradeForm')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersMenu;