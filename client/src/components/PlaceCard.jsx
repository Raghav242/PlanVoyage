import React, { useState } from "react";
import TripSelectorModal from "./TripSelectorModal";
import axios from "axios";

export default function PlaceCard({ place, userId, selectedPlan, setSelectedPlan }) {
  const [showModal, setShowModal] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    if (!userId) {
      alert("You must be logged in to add places to a plan.");
      return;
    }

    if (selectedPlan) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/plans/${selectedPlan.id}/places`,
          {
            placeId: place.properties.place_id,
            name: place.properties.name,
            address: place.properties.formatted,
            latitude: place.properties.lat,
            longitude: place.properties.lon,
            category: place.properties.categories?.[0] || "Uncategorized",
            source: "Geoapify",
            phone: place.properties.contact?.phone || "",
            website: place.properties.website || place.properties.datasource?.url || "",
            imageUrl: "",
            notes: "",
            order: 0,
          },
          { withCredentials: true }
        );

        setAdded(true);
      } catch (err) {
        console.error("Failed to add place to plan:", err);
        alert("Failed to add to plan.");
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div className="flex-grow-1 me-3">
          <h4 className="card-title">{place.properties.name}</h4>
          <p><strong>Type:</strong> {place.properties.categories?.join(", ")}</p>
          <p><strong>Address:</strong> {place.properties.formatted}</p>
          <p>
            <strong>Contact:</strong>{" "}
            {place.properties.contact ? (
              <>
                {place.properties.contact.phone && <span>Phone: {place.properties.contact.phone}</span>}
                <br />
                {place.properties.contact.phone_other && <span>Other: {place.properties.contact.phone_other}</span>}
                <br />
                {place.properties.contact.email && <span>Email: {place.properties.contact.email}</span>}
              </>
            ) : (
              "N/A"
            )}
          </p>
        </div>

        <div className="d-flex flex-column align-items-end justify-content-between" style={{ minWidth: "150px" }}>
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={added}
            style={{ whiteSpace: "nowrap", width: "100%" }}
          >
            {added ? "Added" : "Add to Plan"}
          </button>

          {selectedPlan && (
            <span className="text-muted small mt-2 text-center w-100">
              {added ? `✔ Added to ${selectedPlan.name}` : `Adding to: ${selectedPlan.name}`}
            </span>
          )}
        </div>
      </div>

      {/* Modal fallback if no plan is selected */}
      {showModal && (
        <TripSelectorModal
          place={place}
          userId={userId}
          onClose={() => setShowModal(false)}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      )}
    </div>
  );
}
