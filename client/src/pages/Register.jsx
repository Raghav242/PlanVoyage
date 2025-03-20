// User authentication pages.

import React, { useState } from 'react';
import logo from '../assets/logo-login.jpg';  
import backgroundImage from '../assets/background-login.jpeg';
import { Link } from 'react-router-dom';

export default function Register() {
  // State to manage form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle input change for username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle input change for password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle input change for confirm password
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission (register button click)
  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        alert(`Registered successfully as: ${username}`);
      } else {
        alert("Passwords do not match.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="container-fluid d-flex" style={{ minHeight: '100vh' }}>
      {/* Left Side Image Section */}
      <div className="col-7" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>

      {/* Right Side Register Section */}
      <div className="col-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f5f5dc', minHeight: '100vh' }}>
        <div className="card p-4 shadow-lg" style={{ width: '20rem' }}>
          {/* Company Logo */}
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
          </div>

          {/* Register Form */}
          <h3 className="text-center mb-4">Create an Account</h3>
          <form onSubmit={handleRegister}>
            {/* Username Field */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>

            {/* Register Button */}
            <button type="submit" className="btn" style={{ backgroundColor: '#219EBC', color: 'white', width: '100%' }}>
              Register
            </button>
          </form>

          {/* Login Redirect */}
          <div className="text-center mt-3">
            <p>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#219EBC', textDecoration: 'none' }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

  