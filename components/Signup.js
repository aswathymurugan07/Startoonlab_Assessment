import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', { name, password, email, gender });
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleSignin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqI4hvCHWsCjsEn-It33lBpAL80baI4OOZkQ&s" alt="Signup Illustration" className="signup-image" />
      <div className="signup-form">
        <form onSubmit={handleSignup}>
          <input className='in' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className='in' type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className='in' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div className="gender-options">
            <span className="gender-label">Gender:</span>
            <label>
              <input type="radio" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} required />
              Male
            </label>
            <label>
              <input type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} required />
              Female
            </label>
          </div>
          <br/><br/>
          <button className='button1' type="submit">Sign Up</button>
          <button type="button" onClick={handleSignin} className="signin-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
