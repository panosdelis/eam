import React from 'react';
import Topbar from './topbar';
import { Button, Button2 } from './Button';
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

  const buttonStyleMobile = {
    ...buttonStyleCommon,
    width: '40%',
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

  const dynamicText1 = (<div><br />  1. Κάντε κλικ στο σημα User πάνω δεξιά <br /> 2. Πατήστε στο κουμπι Edit info κάτω απ τις πληροφορίες <br /> 3. Συμπληρώστε η αλλάξτε τα στοιχεία που θέλετε και κάντε κλικ στο Save Changes απο κάτω</div>);
  const dynamicText2 = (<div><br />  1. Στο κεντρικό μενού Καθηγητή πατάμε στο κουμπί Βαθμολόγιο  <br /> 2. Στο drop down κουμπί επιλέγουμε το μάθημα που θέλουμε να βαθμολογίσουμε <br /> 3. Σε κάθε φοιτητή επιλέγουμε τον βαθμό με το αντίστοιχο drop down κουμπί. <br /> 4. Αν θέλουμε να οριστικοποιηθούν οι βαθμολογίες πατάμε στο κουμπί Finalize Grades, και αντι για drop down κουμπιά έχουμε τη τελική βαθμολογία </div>);

  return (
    <div>
      <Topbar />
      <div className="Title">
        <h1 style={h1Style}>Teachers Info</h1>
      </div>
      <div className="container-fluid">
        <div className="col text-center">
          <div style={buttonTopStyle}>
          </div>
          <div style={screenWidth < 600 ? buttonStyleMobile : firstButtonRowStyle}>
            <InfoBox header="Πώς μπορώ να αλλάξω το κάποια απ' τα στοιχεία μου" text={dynamicText1} />
            <InfoBox header="Πώς μπορώ να Βαθμολογήσω μαθήματα" text={dynamicText2} />
          </div>
          <div style={screenWidth < 600 ? buttonStyleMobile : buttonRow2Style}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsInfo;