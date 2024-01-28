import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore'
import { courses } from '../../Utils/Objects/objects';
import './index.css'
import styled from 'styled-components';
import EkpaLogo from '../ExportedComponents/img/EKPAlogo.png';

const CenteredContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
background-color: #f5f5f5; /* Nice background color */
font-family: 'Arial', sans-serif; /* Nice font */
`;

const h1Style = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '20px',
  marginRight: '40px',
  marginLeft: '40px',
  fontFamily: 'Your Preferred Font, Arial, sans-serif',
};

const ekpaLogoStyle = {
  width: '30rem',

  borderRadius: '50%',
  marginRight: '20px',
  marginBottom: '30px',
};

export default function Register({ db }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [nameSurname, setNameSurname] = useState('');
  const [semester, setSemester] = useState('');


  async function handleRegister(e) {
    e.preventDefault()


    const docUser = {
      email: email,
      password: password,
      nameSurname: nameSurname,
      role: role,
      id: id,
      semester: semester,
      courses: [
        {


        }
      ]
    };

    try {

      const ref_user = doc(db, "users", email)

      const res_user = await setDoc(ref_user, docUser);



      const ref_courses = doc(db, "courses", "all_courses")
      const res_courses = await setDoc(ref_courses, courses);


      window.location.href = '/'

    } catch (e) {
      console.log(e)
    }

  }
  return (
    <CenteredContainer>
      <div className="Home">
        <div className="row" style={{ display: 'flex', marginTop: '20px', margin: '0 auto', padding: '5px' }}>
          <div className="col text-center">
            <img src={EkpaLogo} style={ekpaLogoStyle} alt="EKPAlogo" />
          </div>
          <div className="col text-center">
            <h1 style={h1Style}>My Studies </h1>
          </div>
          <div className="col text-center">
            <div className='register'>
              <form onSubmit={handleRegister} className='register-container'>
                <h2>Register</h2>
                <div className='register-row'>
                  <label>Email:</label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='register-row'>
                  <label>Password:</label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='register-row'>
                  <label>Name, Surname:</label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    type="nameSurname"
                    value={nameSurname}
                    onChange={(e) => setNameSurname(e.target.value)}
                  />
                </div>
                <div className='register-row'>
                  <label>Identifier:</label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    type="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
                <div className='register-row'>
                  <label>Semester:</label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    type="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="role">Role:</label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                  <button type='submit'>Register</button>
                </div>
                <div style={{ marginTop: '5px', marginLeft: '60px' }}>
                  <a href='/'>Already have an Account?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </CenteredContainer>
  )
}