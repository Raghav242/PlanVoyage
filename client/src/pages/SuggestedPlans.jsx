import React, { useState, useEffect } from 'react';
import { useAuthUser } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SuggestedPlans() {
  const { user } = useAuthUser();
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    destination: '',
    places: '',
    description: '',
    image: '',
    website: '',
    category: '',
  });

  const navigate = useNavigate();

  // Fetch existing trip suggestions when the page loads
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/suggestions`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error('Error fetching suggestions:', error));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Adding a new suggestion)
  const handleAddSuggestion = async (e) => {
    e.preventDefault();
    if (!formData.destination) {
      alert('Destination is required!');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/suggestions`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: formData.destination,
          places: formData.places ? JSON.stringify(formData.places.split(',').map(place => place.trim())) : null, // Convert places string to JSON array
          description: formData.description,
          image: formData.image,
          website: formData.website,
          category: formData.category,
        }),
      });

      const newSuggestion = await res.json();
      if (res.ok) {
        setSuggestions([...suggestions, newSuggestion]); // Update UI instantly
        setShowModal(false); // Close modal
        setFormData({ destination: '', places: '', description: '', image: '', website: '', category: '' }); // Reset form
      } else {
        alert(newSuggestion.message || 'Failed to add suggestion.');
      }
    } catch (error) {
      alert('Error adding suggestion. Try again.');
    }
  };

  // Handle View button click (Navigate to TripSuggestions page with selected suggestion)
  const handleViewClick = (suggestion) => {
    navigate(`/view-suggestion/${suggestion.id}`, { state: suggestion }); // Pass the entire suggestion data to ViewSuggestion page
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Suggested Plans</h1>

      {/* Add Suggestion Button (Only visible if user is logged in) */}
      {user && (
        <div className="mb-4 text-center">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Add Suggestion
          </button>
        </div>
      )}

      {/* Display suggestions in boxes/cards */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {suggestions.length === 0 ? (
          <div className="col-12 text-center">
            <p>No trip suggestions available.</p>
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div className="col" key={suggestion.id}>
              <div className="card h-100" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                <img
                  src={suggestion.image}
                  alt="Suggestion"
                  className="card-img-top"
                  style={{ maxHeight: '200px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{suggestion.destination}</h5>
                  <p className="card-text">
                    <strong>Places:</strong> {suggestion.places ? JSON.parse(suggestion.places).join(', ') : 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {suggestion.category}
                  </p>
                </div>

                <div className="card-footer text-center">
                  {/* View Button */}
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewClick(suggestion)} // Pass the suggestion data
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Adding a Suggestion */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} aria-labelledby="exampleModalLabel" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Suggestion</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Form */}
                <form onSubmit={handleAddSuggestion}>
                  <div className="mb-3">
                    <label htmlFor="destination" className="form-label">Destination</label>
                    <input type="text" id="destination" name="destination" className="form-control" placeholder="Enter Destination" value={formData.destination} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="places" className="form-label">Places to Visit (comma-separated)</label>
                    <input type="text" id="places" name="places" className="form-control" placeholder="Enter Places (e.g., Park, Museum)" value={formData.places} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" name="description" className="form-control" placeholder="Enter Description" value={formData.description} onChange={handleChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input type="text" id="image" name="image" className="form-control" placeholder="Enter Image URL" value={formData.image} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="website" className="form-label">Website URL</label>
                    <input type="text" id="website" name="website" className="form-control" placeholder="Enter Website URL" value={formData.website} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" id="category" name="category" className="form-control" placeholder="Enter Category" value={formData.category} onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-success w-100">Add Suggestion</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
