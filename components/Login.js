import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { name, email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/profile');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid credentials');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup'); // Adjust the path to match your signup route
    };

    return (
        <div className="signup-page">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqI4hvCHWsCjsEn-It33lBpAL80baI4OOZkQ&s" alt="Login Illustration" className="signup-image" />
            <div className="signup-form">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <input className='in' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input className='in' type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className='in' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br></br>
                    <button className="button1" type="button" onClick={handleSignupRedirect}>Sign Up</button>
                    <button className='signin-button' type="submit" style={{ marginTop: '10px' }}>Sign in</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
