import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuthUser();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top w-100" style={{ backgroundColor: "#023047" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          PlanVoyage
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/plan-trips">
                Plan Your Trips
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved-plans">
                Saved Plans
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/suggested-plans">
                Trip Suggestions
              </Link>
            </li>
            {currentUser ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none", color: "white" }}
                >
                  {currentUser.username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                        setCurrentUser(null);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login/Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
