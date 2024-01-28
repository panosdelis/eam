import './index.css'
import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import EkpaLogo from '../ExportedComponents/img/EKPAlogo.png';
import styled from 'styled-components';

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


export default function Login({ db }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    async function handleLogin(e) {
        e.preventDefault()
        if (!email || !password) {
            setErrorMessage('Please provide both email and password.');
            return;
        }


        const ref = doc(db, "users", email);

        const res = await getDoc(ref);

        if (res.exists() && res.data().email === email && res.data().password === password) {

            const user_role = res.data().role
            const user_email = res.data().email


            localStorage.setItem('role', user_role)
            localStorage.setItem('email', user_email)


            if (user_role == 'student') {
                window.location.href = './studentsmenu'
            } else if (user_role == 'teacher') {
                window.location.href = './teachersmenu'
            } else {
                window.location.href = './courses'
            }


        } else {
            setErrorMessage('Invalid email or password. Please try again.');
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
                        <div className='login'>
                            <form onSubmit={handleLogin} className='login-container'>
                                <h2>Login</h2>
                                <div className='login-row'>
                                    <label>Email:</label>
                                    &nbsp;&nbsp;&nbsp;
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='login-row'>
                                    <label>Password:</label>
                                    &nbsp;&nbsp;&nbsp;
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type='submit'>Login</button>
                                <div style={{ marginTop: '5px', marginLeft: '60px' }}>
                                    <a href='/register'>Create new user.</a>
                                </div>

                            </form>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </CenteredContainer>
    )
}