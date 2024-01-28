import React from 'react';
import Topbar from './topbar';
import {Button,Button2} from './Button';
import { useNavigate } from 'react-router-dom';

const StudentsInfo = () => {

  const navigate = useNavigate();

  const h1Style = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    fontFamily: 'Your Preferred Font, Arial, sans-serif',
  };


  const textInputStyle = {
    width: '20%',
    height: '50px',
    borderRadius: '20px', 
    border: '1px solid #3498db',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '1rem',
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const roundedBoxStyle = {
    width: '400px',
    height: '350px',
    borderRadius: '20px', 
    backgroundColor: '#3498db',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px',
    fontSize: '1rem',
    cursor: 'pointer',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20%',
    marginBottom: '5%',
  };

  const buttonRow2Style = {
    display: 'flex',
    justifyContent: 'center',
    gap: '8%',
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

  const handleClick = (path) => {
    navigate(path);
  };

  const InfoBox = ({ header, text }) => {
    const infoBoxStyle = {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '400px',
      padding: '20px',
      textAlign: 'left',
    };
  
    const headerStyle = {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    };
  
    const textPartStyle = {
      fontSize: '1rem',
      color: '#555',
    };
  
    return (
      <div style={infoBoxStyle}>
        <div style={headerStyle}>{header}</div>
        <div style={textPartStyle}>{text}</div>
      </div>
    );
  };

  const screenWidth = window.innerWidth;

  const dynamicText0 = (<div><br />  1. Στο κύριο μενού φοιτητή πατάμε Ιστορικό. <br />  2. Επιλέγουμε στα drop down κουμπιά της κατάληλες παραμέτρους.</div>);
  const dynamicText1 = (<div><br />  1. Κάντε κλικ στο σημα User πάνω δεξιά <br /> 2. Πατήστε στο κουμπι Edit info κάτω απ τις πληροφορίες <br /> 3. Συμπληρώστε η αλλάξτε τα στοιχεία που θέλετε και κάντε κλικ στο Save Changes απο κάτω</div>);
  const dynamicText2 = (<div><br />  1. Στο κύριο μενού φοιτητή πατάμε Δηλώσεις. <br /> 2. Επιλέγουμε τα κουτία στα μαθήματα που θέλουμε να δηλώσουμε. <br /> 3. Για να δηλωθούν παταμε το κουμπί Submit</div>);
  const dynamicText3 = (<div><br />  1. Στο κύριο μενού φοιτητή πατάμε Βαθμολογίες / Ιστορικό <br /> 2. Επιλέγουμε στα drop down κουμπιά της κατάληλες παραμέτρους.<br /> </div>);
  const dynamicText4 = (<div><br />  1. Στο κύριο μενού φοιτητή πατάμε Αιτήσεις <br /> 2. Επιλέγουμε στο drop down κουμπι την Αίτηση που θέλουμε <br /></div>);



  return (
    <div>
      <Topbar />
      <div className="Title">
        <h1 style={h1Style}>Students Info</h1>
      </div>
      <div className="container-fluid">
        <div className="col text-center">
        <div style={buttonTopStyle}>
        {/* <InfoBox header="Πώς μπορώ να δω το Ιστορικό Δηλώσεων μου" text={dynamicText0} /> */}
        </div>
          <div style={screenWidth < 600 ? buttonStyleMobile : firstButtonRowStyle}>
          <InfoBox header="Πώς μπορώ να αλλάξω το κάποια απ' τα στοιχεία μου" text={dynamicText1} />
            <InfoBox header="Πώς μπορώ να δηλώσω μαθήματα" text={dynamicText2} />
          </div>
          <div style={screenWidth < 600 ? buttonStyleMobile : buttonRow2Style}>
          <InfoBox header="Πώς μπορώ να δω τις βαθμολογίες η το Ιστορικό μου" text={dynamicText3} />
          <InfoBox header="Πώς μπορώ να κάνω κάποια Αίτηση" text={dynamicText4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsInfo;