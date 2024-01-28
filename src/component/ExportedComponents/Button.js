
import React, { useState } from 'react';

const Button = ({ label, onClick }) => {
  const buttonStyle = {
    backgroundColor: '#ffc107',
    color: '#212529',
    padding: '50px 100px',
    borderRadius: 'px',
    border: '1px solid #ffc107',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

const Button2 = ({ label, variant = 'default', onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getButtonColor = (variant) => {
    switch (variant) {
      case 'primary':
        return '#2ecc71';
      case 'warning':
        return '#e74c3c';

      default:
        return '#0075cb';
    }
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '3rem 3rem',
    fontSize: '2vw',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '30px',
    color: '#fff',
    backgroundColor: getButtonColor(variant),
    transition: 'transform 0.3s ease',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {label}
    </button>
  );
};

const ButtonBar = ({ label, onClick }) => {
  const buttonStyle = {
    backgroundColor: '#0',
    color: '#0',
    padding: '10px 40px',
    borderRadius: '1px',
    border: '1px solid #0',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

const IconButton = ({ label, iconSrc, onClick, style, labelStyle }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      {iconSrc && <img src={iconSrc} alt={label} style={{ ...style }} />}
      {label && <span style={{ ...labelStyle }}>{label}</span>}
    </button>
  );
};


export { Button, Button2, ButtonBar, IconButton };