import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import Topbar from './topbar';
import bananaUser from './img/bananaUser.jpg';


const InfoBox = ({ nameSurname, email, id, semester }) => {
  const infoBoxStyle = {
    backgroundColor: '#f7f7f7',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const infoPairStyle = {
    marginBottom: '8px',
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: 'bold',
    textAlign: 'left',
  };

  const infoStyle = {
    marginBottom: '8px',
    font: '1em sans-serif',
    textAlign: 'left',
    marginRight: '20px',
  };

  return (
    <div style={infoBoxStyle}>
      {nameSurname && (
        <div style={infoPairStyle}>
          <label style={labelStyle}>Name: </label>
          <div style={infoStyle}>{nameSurname}</div>
        </div>
      )}

      {email && (
        <div style={infoPairStyle}>
          <label style={labelStyle}>Email:</label>
          <div style={infoStyle}>{email}</div>
        </div>
      )}

      {id && (
        <div style={infoPairStyle}>
          <label style={labelStyle}>ID:</label>
          <div style={infoStyle}>{id}</div>
        </div>
      )}

      {semester && (
        <div style={infoPairStyle}>
          <label style={labelStyle}>Semester:</label>
          <div style={infoStyle}>{semester}</div>
        </div>
      )}
    </div>
  );
};


const FormBox = ({ initialData, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const formBoxStyle = {
    backgroundColor: '#f7f7f7',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-center',
  };

  const formLabelStyle = {
    marginBottom: '8px',
    display: 'inline-block',
    width: '120px',
    textAlign: 'left',
    fontWeight: 'bold',
  };

  const formInputStyle = {
    width: '300px',
    padding: '8px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    font: '1em sans-serif',
    boxSizing: 'border-box',
    textAlign: 'left',
  };

  const formButtonStyle = {
    backgroundColor: '#0075cb',
    color: '#fff',
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const firebaseConfig = {
        apiKey: "AIzaSyA7gERAbafNYLIsLwsh52BBvDvkdlVdJzU",
        authDomain: "eamtest-31519.firebaseapp.com",
        projectId: "eamtest-31519",
        storageBucket: "eamtest-31519.appspot.com",
        messagingSenderId: "34767020876",
        appId: "1:34767020876:web:b6e8b718b40bdd35ed25e9"

      };

      const app = initializeApp(firebaseConfig);
      const database = getFirestore(app);

      const email = localStorage.getItem('email');
      const userDocRef = doc(database, 'users', email);

      await setDoc(userDocRef, formData, { merge: true });

      onSubmit(formData);
    } catch (error) {
      console.error('Error updating user data:', error);

    }
  };

  return (
    <form style={formBoxStyle} onSubmit={handleSubmit}>
      <div>
        <label style={formLabelStyle} htmlFor="nameSurname">
          Name:
        </label>
        <input
          style={formInputStyle}
          type="text"
          id="nameSurname"
          name="nameSurname"
          value={formData.nameSurname}
          onChange={handleChange}
        />
      </div>

      <div>
        <label style={formLabelStyle} htmlFor="email">
          Email:
        </label>
        <input
          style={formInputStyle}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled
        />
      </div>

      <div>
        <label style={formLabelStyle} htmlFor="id">
          ID:
        </label>
        <input
          style={formInputStyle}
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>

      {localStorage.getItem('role') !== 'teacher' && (
        <div>
          <label style={formLabelStyle} htmlFor="semester">
            Semester:
          </label>
          <input
            style={formInputStyle}
            type="text"
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="button">
        <button style={formButtonStyle} type="submit">
          Save Changes
        </button>
        <button style={formButtonStyle} type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};


const User = () => {
  const userPageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (formData) => {
    setUserData(formData);
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const firebaseConfig = {
        apiKey: "AIzaSyA7gERAbafNYLIsLwsh52BBvDvkdlVdJzU",
        authDomain: "eamtest-31519.firebaseapp.com",
        projectId: "eamtest-31519",
        storageBucket: "eamtest-31519.appspot.com",
        messagingSenderId: "34767020876",
        appId: "1:34767020876:web:b6e8b718b40bdd35ed25e9"

      };

      const app = initializeApp(firebaseConfig);
      const database = getFirestore(app);

      const email = localStorage.getItem('email');
      const userDocRef = doc(database, 'users', email);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userDataFromFirestore = userDocSnapshot.data();
          setUserData(userDataFromFirestore);
        } else {
          console.error('User not found with the given email.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const userAvatarStyle = {
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
    marginRight: '20px',
    marginBottom: '30px',
  };

  return (
    <body>
      <Topbar />
      <div style={userPageStyle}>
        <img src={bananaUser} alt="User Avatar" style={userAvatarStyle} />

        <div>
          {isEditing ? (
            <FormBox initialData={userData} onCancel={() => setIsEditing(false)} onSubmit={handleFormSubmit} />
          ) : (
            <div>
              {userData && <InfoBox {...userData} />}
              <button style={{ display: 'flex', marginTop: '20px', margin: '0 auto', padding: '5px' }} onClick={handleEditClick}>
                Edit Info
              </button>
            </div>
          )}
        </div>
      </div>
    </body>
  );
};

export default User;