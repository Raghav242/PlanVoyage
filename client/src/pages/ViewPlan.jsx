import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewPlan() {
  const { state: plan } = useLocation();
  const navigate = useNavigate();
  const [places, setPlaces] = useState(plan?.places || []);
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [editedPlace, setEditedPlace] = useState({});

  if (!plan) return <p className="text-center mt-5">Plan not found.</p>;

  const handleDeletePlan = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this plan?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/plans/${plan.id}`, {
        withCredentials: true,
      });
      alert("Plan deleted successfully.");
      navigate("/saved-plans");
    } catch (err) {
      console.error("Failed to delete plan:", err);
      alert("Failed to delete plan.");
    }
  };

  const handleDeletePlace = async (placeId) => {
    const confirmDelete = window.confirm("Delete this place from the plan?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/trip-places/${placeId}`, {
        withCredentials: true,
      });
      setPlaces((prev) => prev.filter((p) => p.id !== placeId));
    } catch (err) {
      console.error("Failed to delete place:", err);
      alert("Failed to delete place.");
    }
  };

  const handleEditPlace = (place) => {
    setEditingPlaceId(place.id);
    setEditedPlace(place);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPlace((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/trip-places/${editingPlaceId}`,
        editedPlace,
        { withCredentials: true }
      );
      setPlaces((prev) =>
        prev.map((p) => (p.id === editingPlaceId ? res.data : p))
      );
      setEditingPlaceId(null);
    } catch (err) {
      console.error("Failed to update place:", err);
      alert("Failed to update place.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <button className="btn btn-danger" onClick={handleDeletePlan}>
          Delete Plan
        </button>
      </div>

      <h2 className="text-center mb-3">{plan.name}</h2>
      {plan.description && (
        <p className="text-center text-muted">{plan.description}</p>
      )}

      {places.length === 0 ? (
        <p className="text-center mt-4">No places added to this plan.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {places.map((place) => (
            <div className="col" key={place.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  {editingPlaceId === place.id ? (
                    <>
                      <input
                        className="form-control mb-2"
                        name="name"
                        value={editedPlace.name || ""}
                        onChange={handleEditChange}
                        placeholder="Place Name"
                      />
                      <input
                        className="form-control mb-2"
                        name="address"
                        value={editedPlace.address || ""}
                        onChange={handleEditChange}
                        placeholder="Address"
                      />
                      <input
                        className="form-control mb-2"
                        name="phone"
                        value={editedPlace.phone || ""}
                        onChange={handleEditChange}
                        placeholder="Phone"
                      />
                      <input
                        className="form-control mb-2"
                        name="website"
                        value={editedPlace.website || ""}
                        onChange={handleEditChange}
                        placeholder="Website"
                      />
                      <input
                        className="form-control mb-2"
                        name="category"
                        value={editedPlace.category || ""}
                        onChange={handleEditChange}
                        placeholder="Category"
                      />
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-success btn-sm" onClick={handleEditSave}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingPlaceId(null)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{place.name}</h5>
                      {place.address && <p><strong>Address:</strong> {place.address}</p>}
                      {place.category && <p><strong>Category:</strong> {place.category}</p>}
                      {place.phone && <p><strong>Phone:</strong> {place.phone}</p>}
                      {place.website && (
                        <p>
                          <strong>Website:</strong>{" "}
                          <a
                            href={place.website.startsWith("http") ? place.website : `https://${place.website}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {place.website}
                          </a>
                        </p>
                      )}
                      <p className="text-muted small mb-2">
                        Lat: {place.latitude}, Lon: {place.longitude}
                      </p>
                      <div className="d-flex gap-2 justify-content-end">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleEditPlace(place)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeletePlace(place.id)}>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
