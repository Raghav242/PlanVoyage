import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center">
      <h1 className="mb-3 fw-bold">Welcome to PlanVoyage</h1>
      <p className="lead w-75">
        Discover and plan your perfect trip effortlessly! Whether you're looking for tourist attractions, restaurants, or parks, our platform helps you find the best spots based on your preferences.
      </p>
      <Link to="/plan-trips" className="btn btn-primary btn-lg mt-3 shadow">
        Start Planning Your Trip
      </Link>
    </div>
  );
}
