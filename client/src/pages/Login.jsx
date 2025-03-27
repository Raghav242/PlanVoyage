import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";
import logo from "../assets/logo-login.jpg";  
import backgroundImage from "../assets/background-login.jpeg";  

export default function Login() {
  const { login } = useAuthUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await login(username, password);

      if (response.ok) {
        navigate("/");  // Navigate to home after successful login
      } else {
        const data = await response.json();
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        paddingTop: "80px", // Adds space above the login box
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "22rem", backgroundColor: "#f5f5dc" }}>
        {/* Smaller Logo */}
        <div className="text-center mb-3">
          <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "120px" }} /> {/* Reduced size */}
        </div>

        <h3 className="text-center mb-4">Login</h3>

        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn" style={{ backgroundColor: "#219EBC", color: "white", width: "100%" }}>
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-3">
          <p>
            New user?{" "}
            <Link to="/register" style={{ color: "#219EBC", textDecoration: "none" }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
