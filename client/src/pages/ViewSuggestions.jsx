import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../context/AuthContext';

export default function ViewSuggestion() {
  const { state: suggestion } = useLocation();
  const { user } = useAuthUser();
  const [formData, setFormData] = useState(suggestion || {});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (suggestion) {
      setFormData(suggestion);
    }
  }, [suggestion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { destination, places, description, image, website, category } = formData;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/suggestions/${suggestion.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          places: places ? JSON.stringify(places.split(',').map(place => place.trim())) : null,
          description,
          image,
          website,
          category,
        }),
      });

      if (res.ok) {
        alert('Suggestion updated successfully');
        navigate('/suggested-plans');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to update suggestion.');
      }
    } catch (error) {
      alert('Error updating suggestion.');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/suggestions/${suggestion.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        navigate('/suggested-plans');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to delete suggestion.');
      }
    } catch (error) {
      alert('Error deleting suggestion.');
    }
  };

  const formatPlaces = (places) => {
    if (!places) return [];
    if (Array.isArray(places)) return places;

    try {
      const parsed = JSON.parse(places);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      return places.split(',').map(p => p.trim());
    }

    return [];
  };

  const ensureHttp = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  const formattedPlaces = formatPlaces(formData.places);
  const formattedWebsite = ensureHttp(formData.website);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center"><b>Viewing  {formData.destination}</b></h2>
      <div className="card shadow-sm overflow-hidden">
        {/* Image at top */}
        {formData.image && (
          <img
            src={ensureHttp(formData.image)}
            alt="Trip"
            className="w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}

        <div className="card-body text-center">
          <h5 className="card-title mb-4">Itinery Details</h5>

          <div className="mb-3"><strong>Destination:</strong> {formData.destination}</div>

          <div className="mb-3">
            <strong>Places:</strong>
            <ul className="list-group mt-2">
              {formattedPlaces.map((place, index) => (
                <li key={index} className="list-group-item">{place}</li>
              ))}
            </ul>
          </div>

          <div className="mb-3"><strong>Description:</strong> {formData.description}</div>

          <div className="mb-3">
            <strong>Website:</strong>{' '}
            {formData.website ? (
              <a href={formattedWebsite} target="_blank" rel="noopener noreferrer">
                {formData.website}
              </a>
            ) : 'N/A'}
          </div>

          <div className="mb-4"><strong>Category:</strong> {formData.category}</div>

          {/* Edit/Delete Buttons */}
          {user && suggestion.userId === user.id && !isEditing && (
            <>
              <button className="btn btn-info w-100 mb-2" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="btn btn-danger w-100" onClick={handleDelete}>
                Delete Suggestion
              </button>
            </>
          )}

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="destination" className="form-label">Destination</label>
                <input
                  type="text"
                  name="destination"
                  className="form-control"
                  value={formData.destination || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="places" className="form-label">Places to Visit (comma-separated)</label>
                <input
                  type="text"
                  name="places"
                  className="form-control"
                  value={Array.isArray(formData.places) ? formData.places.join(', ') : formData.places || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image URL</label>
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  value={formData.image || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="website" className="form-label">Website URL</label>
                <input
                  type="text"
                  name="website"
                  className="form-control"
                  value={formData.website || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={formData.category || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100">Update Suggestion</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
