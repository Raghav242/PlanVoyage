import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-login.jpg";  // Replace with your logo image path
import backgroundImage from "../assets/background-login.jpeg";  // Replace with your background image path

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || "Registration failed.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
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
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        paddingTop: "80px", // Adds space above the register box
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "22rem", backgroundColor: "#f5f5dc" }}>
        {/* Smaller Logo */}
        <div className="text-center mb-3">
          <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: "120px" }} /> {/* Reduced size */}
        </div>

        <h3 className="text-center mb-4">Create an Account</h3>

        {/* Error/Success Messages */}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}

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
            />
          </div>

          <button type="submit" className="btn" style={{ backgroundColor: "#219EBC", color: "white", width: "100%" }}>
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#219EBC", textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
