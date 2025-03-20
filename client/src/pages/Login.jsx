import React, { useState } from 'react';
import logo from '../assets/logo-login.jpg';  
import backgroundImage from '../assets/background-login.jpeg';
import { Link } from 'react-router-dom';

export default function Login() {
  // State to manage username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle input change for username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle input change for password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission (login button click)
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      alert(`Logged in as: ${username}`);
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="container-fluid d-flex" style={{ minHeight: '100vh' }}>
      {/* Left Side Image Section */}
      <div className="col-7" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Image will be shown here */}
      </div>

      {/* Right Side Login Section */}
      <div className="col-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f5f5dc', minHeight: '100vh' }}>
        <div className="card p-4 shadow-lg" style={{ width: '20rem' }}>
          {/* Company Logo */}
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
          </div>

          {/* Login Form */}
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
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

            {/* Login Button */}
            <button type="submit" className="btn" style={{ backgroundColor: '#219EBC', color: 'white', width: '100%' }}>
              Login
            </button>
          </form>

          {/*Create account*/}
          <div className="text-center mt-3">
          <p>
            New user?{' '}
            <Link to="/register" style={{ color: '#219EBC', textDecoration: 'none' }}>
              Create an account
            </Link>
          </p>
        </div>
        </div>  
      </div>
    </div>
  );
}
