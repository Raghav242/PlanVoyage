import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewPlan() {
  const { state: plan } = useLocation();
  const navigate = useNavigate();

  if (!plan) return <p className="text-center mt-5">Plan not found.</p>;

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="text-center mb-4">{plan.name}</h2>
      {plan.description && (
        <p className="text-center text-muted">{plan.description}</p>
      )}

      {plan.places?.length === 0 ? (
        <p className="text-center mt-4">No places added to this plan.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {plan.places.map((place) => (
            <div className="col" key={place.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{place.name}</h5>
                  {place.address && <p><strong>Address:</strong> {place.address}</p>}
                  {place.category && <p><strong>Category:</strong> {place.category}</p>}
                  {place.phone && <p><strong>Phone:</strong> {place.phone}</p>}
                  {place.website && (
                    <p>
                      <strong>Website:</strong>{" "}
                      <a href={place.website.startsWith("http") ? place.website : `https://${place.website}`} target="_blank" rel="noreferrer">
                        {place.website}
                      </a>
                    </p>
                  )}
                  <p className="text-muted small mb-0">
                    Lat: {place.latitude}, Lon: {place.longitude}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
