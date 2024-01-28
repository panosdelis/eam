import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthorization = (Component, expectedValue, storageKey) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const storedValue = localStorage.getItem(storageKey);

      if (storedValue !== expectedValue) {
        alert('Unauthorized access. Please return to the homepage.');
        navigate('/');
      }
    }, [navigate]);

    return <Component {...props} />;
  };
};

export default withAuthorization;
