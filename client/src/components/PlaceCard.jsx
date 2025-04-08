import React, { useState } from "react";

export default function PlaceCard({ place, selectedTrip, onAdd, isAdded }) {
  const [error, setError] = useState("");

  const handleAddClick = async () => {
    if (!selectedTrip) {
      setError("Please select a plan above before adding places.");
      return;
    }

    try {
      await onAdd(place);
      setError("");
    } catch (err) {
      console.error("Failed to add place:", err);
      setError("Failed to add place. Please try again.");
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-start">
        {/* Place Info */}
        <div className="flex-grow-1 me-3">
          <h4 className="card-title">{place.properties.name}</h4>
          <p><strong>Type:</strong> {place.properties.categories.join(", ")}</p>
          <p><strong>Address:</strong> {place.properties.formatted}</p>
          <p>
            <strong>Contact:</strong>{" "}
            {place.properties.contact ? (
              <>
                {place.properties.contact.phone && (
                  <span>Phone: {place.properties.contact.phone}</span>
                )}
                <br />
                {place.properties.contact.email && (
                  <span>Email: {place.properties.contact.email}</span>
                )}
              </>
            ) : (
              "N/A"
            )}
          </p>
        </div>

        {/* Action Button */}
        <div className="d-flex flex-column align-items-end" style={{ minWidth: "150px" }}>
          <button
            className={`btn ${isAdded ? "btn-success" : "btn-primary"}`}
            onClick={handleAddClick}
            disabled={isAdded}
            style={{ whiteSpace: "nowrap", width: "100%" }}
          >
            {isAdded ? "Added!" : "Add to Plan"}
          </button>

          {selectedTrip && (
            <span className="text-muted small mt-2 text-center w-100">
              Adding to: <strong>{selectedTrip.name}</strong>
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="alert alert-warning p-2 m-2 mb-3 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
