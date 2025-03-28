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
          `http://localhost:5000/api/places?city=${city}&distance=${distance}&category=${category}&limit=20`
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
    <div
      className="min-vh-100 text-dark p-4"
      style={{
        background: "linear-gradient(to bottom, #87CEEB, #B0E0E6, #98FB98, #D4F1C5)", // Sky blue to light green
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="container mt-5">
        {/* Back Button */}
        <button className="btn btn-outline-dark mb-3" onClick={() => navigate("/plan-trips")}>
          ← Back to Search
        </button>

        {/* Title */}
        <h1 className="fw-bold text-center">
          Search Results for <span className="text-primary">{city || "your location"}</span>
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : places.length === 0 ? (
          <p className="lead mt-3 text-center">
            No places found for <strong>{city || "your location"}</strong>.
          </p>
        ) : (
          <>
            <p className="text-muted text-center mb-4">
              Showing top <strong>{places.length}</strong> results in <strong>{city || "your location"}</strong>
            </p>

            {/* Displaying results in the same layout as before */}
            {places.map((place, index) => (
              <PlaceCard key={index} place={place} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
