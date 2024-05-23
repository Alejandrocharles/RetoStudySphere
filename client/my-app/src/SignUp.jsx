import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onAuthentication }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/signup',
        { name, email, password, isTeacher },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      if (response.data.authenticated) {
        onAuthentication();
        handleLoginClick();
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  const handleLoginClick = () =>{
    navigate('/');
  };

  return (
    <div className="sign-up-form">
      <h2>Let's Get Started!</h2>
      <p>We are happy to have you here</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isTeacher}
            onChange={(e) => setIsTeacher(e.target.checked)}
          />
          I'm a Teacher
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>or continue with</p>
      <div className="social-buttons">
        <button onClick={handleGoogleSignUp} className="google-button">
          <i className="fab fa-google" style={{paddingRight: '10px'}}></i> {/* Icono de Google */}
          Sign in with Google
        </button>
      </div>
      <p>
        Have already an account?{' '}
        <span onClick={handleLoginClick} style={{ cursor: 'pointer', color: 'blue' }}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignUp;
