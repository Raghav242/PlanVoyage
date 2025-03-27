// Displays an individual place with an "Add to Plan" button.
import React from "react";

export default function PlaceCard({ place }) {
  const handleAddToPlan = () => {
    alert(`Added "${place.properties.name}" to your plan!`);
    // Add actual functionality to save to plan
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h4 className="card-title">{place.properties.name}</h4>
          <p className="card-text">
            <strong>Type:</strong> {place.properties.categories.join(", ")}
          </p>
          <p className="card-text">
            <strong>Address:</strong> {place.properties.formatted}
          </p>
          <p className="card-text">
            <strong>Contact:</strong>{" "}
            {place.properties.contact ? (
              <>
                {place.properties.contact.phone && (
                  <span>Phone: {place.properties.contact.phone}</span>
                )}
                <br />
                {place.properties.contact.phone_other && (
                  <span>Other: {place.properties.contact.phone_other}</span>
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
        <div>
          <button className="btn btn-primary" onClick={handleAddToPlan} style={{ whiteSpace: "nowrap" }}>
            Add to Plan
          </button>
        </div>
      </div>
    </div>
  );
}
