import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PlaceCard from "../components/PlaceCard";
import { useAuthUser } from "../context/AuthContext";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const userId = user?.id;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userTrips, setUserTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [addedPlacesMap, setAddedPlacesMap] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const distance = queryParams.get("distance");
  const category = queryParams.get("category");

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/places?city=${city}&distance=${distance}&category=${category}&limit=20`
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

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/plans/user/${userId}`, {
        withCredentials: true,
      })
      .then((res) => setUserTrips(res.data))
      .catch((err) => console.error("Error fetching trips:", err));
  }, [userId]);

  const handleTripSelect = (e) => {
    const tripId = parseInt(e.target.value);
    const trip = userTrips.find((t) => t.id === tripId);
    setSelectedTrip(trip);
    setErrorMessage("");
  };

  const handleCreateNewPlan = async () => {
    const name = prompt("Enter a name for your new plan:");
    if (!name?.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/plans`,
        { name, description: "", userId },
        { withCredentials: true }
      );
      const newTrip = res.data;
      setUserTrips((prev) => [...prev, newTrip]);
      setSelectedTrip(newTrip);
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  const handleAddPlace = async (place) => {
    if (!selectedTrip) {
      setErrorMessage("Please select a plan before adding places.");
      return;
    }

    const planId = selectedTrip.id;
    const placeId = place.properties.place_id;

    if (addedPlacesMap[planId]?.has(placeId)) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/plans/${planId}/places`,
        {
          placeId,
          name: place.properties.name,
          address: place.properties.formatted,
          latitude: place.geometry.coordinates[1],
          longitude: place.geometry.coordinates[0],
          category: place.properties.categories?.[0] || "Other",
          notes: "",
          order: 0,
        },
        { withCredentials: true }
      );

      setAddedPlacesMap((prev) => {
        const newSet = new Set(prev[planId] || []);
        newSet.add(placeId);
        return { ...prev, [planId]: newSet };
      });
    } catch (err) {
      console.error("Failed to add place to plan:", err);
    }
  };

  return (
    <div
      className="min-vh-100 text-dark p-4"
      style={{
        background: "linear-gradient(to bottom, #87CEEB, #B0E0E6, #98FB98, #D4F1C5)",
        overflowY: "auto",
      }}
    >
      <div className="container mt-5">
        <button className="btn btn-outline-dark mb-3" onClick={() => navigate("/plan-trips")}>
          ← Back to Search
        </button>

        <h1 className="fw-bold text-center">
          Search Results for <span className="text-primary">{city || "your location"}</span>
        </h1>

        <div className="d-flex justify-content-center align-items-center my-4 gap-3 flex-wrap">
          <label className="fw-semibold">Selected Plan:</label>
          <select
            className="form-select w-auto"
            value={selectedTrip?.id || ""}
            onChange={handleTripSelect}
          >
            <option value="" disabled>
              Select a plan
            </option>
            {userTrips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.name}
              </option>
            ))}
          </select>

          <button className="btn btn-outline-primary" onClick={handleCreateNewPlan}>
            + Create Plan
          </button>
        </div>

        {errorMessage && (
          <div className="alert alert-warning text-center">{errorMessage}</div>
        )}

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

            {places.map((place, index) => (
              <PlaceCard
                key={index}
                place={place}
                selectedTrip={selectedTrip}
                onAdd={handleAddPlace}
                isAdded={
                  selectedTrip &&
                  addedPlacesMap[selectedTrip.id]?.has(place.properties.place_id)
                }
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
