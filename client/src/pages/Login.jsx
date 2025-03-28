import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";
import logo from "../assets/logo-login.jpg";  
import backgroundImage from "../assets/sea_background.jpg";  

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
        backdropFilter: "blur(5px)",
        display: "flex",
        flexDirection: "column",
        paddingTop: "80px",
      }}
    >
      <div
        className="p-4 shadow-lg"
        style={{
          width: "24rem",
          background: "rgba(255, 255, 255, 0.5)", // Slightly transparent white background
          borderRadius: "20px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "black", // Black text
        }}
      >
        {/* Centered Logo */}
        <div className="text-center mb-3">
          <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "100px", borderRadius: "10px" }} />
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
              style={{
                background: "rgba(255, 255, 255, 0.8)", // More solid for readability
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                color: "black",
                padding: "10px",
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                color: "black",
                padding: "10px",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#0077b6",
              color: "white",
              width: "100%",
              borderRadius: "10px",
              padding: "10px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-3">
          <p>
            New user?{" "}
            <Link to="/register" style={{ color: "#0077b6", textDecoration: "none", fontWeight: "bold" }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
