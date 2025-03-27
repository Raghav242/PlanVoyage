import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="mb-4">Plan your Voyage!</h1>
      <form onSubmit={handleSearch} className="w-75">
        <div className="input-group shadow-lg rounded">
          {/* Destination Field */}
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          {/* Distance Field */}
          <input
            type="number"
            min="5"
            className="form-control"
            placeholder="Enter distance (km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />

          {/* Category Dropdown */}
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="tourism.attraction">Tourist Places</option>
            <option value="catering.restaurant">Restaurants</option>
            <option value="leisure.park">Parks</option>
          </select>

          {/* Search Button */}
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
