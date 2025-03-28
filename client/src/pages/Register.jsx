import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-login.jpg";
import backgroundImage from "../assets/sea_background.jpg";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input change for all fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch {
      setError("Error registering. Please try again.");
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
          background: "rgba(255, 255, 255, 0.5)", // Slightly transparent white
          borderRadius: "20px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "black", // Black text for better readability
        }}
      >
        {/* Centered Logo */}
        <div className="text-center mb-3">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "100px", borderRadius: "10px" }}
          />
        </div>

        <h3 className="text-center mb-4">Create an Account</h3>

        {/* Error/Success Messages */}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && (
          <div className="alert alert-success text-center">{success}</div>
        )}

        {/* Register Form */}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
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
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                background: "rgba(255, 255, 255, 0.8)",
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
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                background: "rgba(255, 255, 255, 0.8)",
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
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
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
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#0077b6",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
  