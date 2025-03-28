import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../assets/sea_background.jpg"; 

export default function PlanTrips() {
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!destination || !distance || !category) {
      alert("Please fill all fields!");
      return;
    }

    // Redirect to SearchResults page with query params
    navigate(
      `/search-results?city=${encodeURIComponent(destination)}&distance=${distance}&category=${category}`
    );
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="mb-4 fw-bold text-white">Plan your Voyage!</h1>
      
      <form onSubmit={handleSearch} className="col-12 col-md-10 col-lg-8">
        <div className="input-group shadow-lg rounded-pill p-2 bg-white">
          {/* Search Icon */}
          <span className="input-group-text bg-transparent border-0">
            <FaSearch className="text-primary" />
          </span>

          {/* Destination Input */}
          <input
            type="text"
            className="form-control border-0"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          {/* Distance Input */}
          <input
            type="number"
            min="5"
            className="form-control border-0"
            placeholder="Enter distance (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />

          {/* Category Dropdown */}
          <select
            className="form-select border-0"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="tourism.attraction">Tourist Places</option>
            <option value="catering.restaurant">Restaurants</option>
            <option value="leisure.park">Parks</option>
          </select>

          {/* Search Button */}
          <button className="btn btn-primary rounded-pill px-4" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
