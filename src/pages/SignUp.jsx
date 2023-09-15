import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  registerWithEmailAndPassword,
  sendPasswordReset,
} from '../firebase'; // Import your Firebase setup functions

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Call the registerWithEmailAndPassword function with name, email, and password
      await registerWithEmailAndPassword(name, email, password);
      // After successful signup, you can redirect the user to a different page, e.g., login
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className='up'>
      <h2 className='signup'>Sign Up</h2>
      <form className='upform' onSubmit={handleSignup}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='buttonup'>Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;