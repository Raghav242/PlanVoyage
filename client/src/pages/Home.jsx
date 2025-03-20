import React, { useState } from 'react';

export default function Home() {
  // State to manage the search query, distance, and selected category
  const [query, setQuery] = useState('');
  const [distance, setDistance] = useState('');
  const [category, setCategory] = useState('');

  // Handle input change for the city query
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle input change for the distance range (as text)
  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  // Handle dropdown change for categories
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle form submission (search button click)
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${query}\nDistance: ${distance} km\nCategory: ${category}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center">
        <h1>Plan your Voyage!</h1>
        <form onSubmit={handleSearch} className="mt-4">
          {/* City Search Input */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control w-200"
              placeholder="Enter city name"
              value={query}
              onChange={handleQueryChange}
            />
          </div>

          {/* Distance Range Input (Optional) */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control w-200"
              placeholder="Enter distance (in km)"
              value={distance}
              onChange={handleDistanceChange}
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-3">
            <select
              className="form-select w-200"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select category</option>
              <option value="touristPlaces">Tourist Places</option>
              <option value="restaurants">Restaurants</option>
              <option value="parks">Parks</option>
            </select>
          </div>

          {/* Search Button */}
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
