import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceCard from "../components/PlaceCard";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const distance = queryParams.get("distance");
  const category = queryParams.get("category");

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/places?city=${city}&distance=${distance}&category=${category}&limit=10`
        );
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaces();
  }, [city, distance, category]);

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/plan-trips")}>
        Back to Search
      </button>
      
      {/* Display Search Title */}
      <h1 className="mb-4">Search Results for <span className="text-primary">{city || "your location"}</span></h1>

      {loading ? (
        // Centered Loading Animation
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : places.length === 0 ? (
        <p>No places found for <strong>{city || "your location"}</strong>.</p>
      ) : (
        <>
          <p className="text-muted">Showing top {places.length} results in <strong>{city || "your location"}</strong></p>
          {places.map((place, index) => <PlaceCard key={index} place={place} />)}
        </>
      )}
    </div>
  );
}
