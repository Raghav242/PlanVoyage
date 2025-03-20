//  Displays places fetched from geoapify API.
import React from 'react';

export default function SearchResults() {
  const places = [
    {
      name: "Swan Boats",
      location: "Boston, Massachusetts",
      type: "Boat rental and sightseeing tour",
      openingHours: "Monday to Sunday, 10:00 AM - 5:00 PM",
      price: "$4.00 USD per person",
      contact: "+1-617-522-1966",
      website: "https://www.swanboats.com",
    },
    {
      name: "Harvard Museum of Natural History",
      location: "Cambridge, Massachusetts",
      type: "Museum",
      openingHours: "Monday to Sunday, 9:00 AM - 5:00 PM",
      price: "$12.00 USD per person",
      contact: "+1-617-495-3045",
      website: "https://hmnh.harvard.edu",
    }
  ];

  const handleAddToPlan = (place) => {
    alert(`Added "${place.name}" to your plan!`);
    // Add functionality here for actually adding the place to the user's plan
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Results</h1>
      
      {places.map((place, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body d-flex justify-content-between">
            <div>
              <h4 className="card-title">{place.name}</h4>
              <p className="card-text">
                <strong>Location:</strong> {place.location}
              </p>
              <p className="card-text">
                <strong>Type:</strong> {place.type}
              </p>
              <p className="card-text">
                <strong>Opening Hours:</strong> {place.openingHours}
              </p>
              <p className="card-text">
                <strong>Price:</strong> {place.price}
              </p>
              <p className="card-text">
                <strong>Contact:</strong> {place.contact}
              </p>
              <p className="card-text">
                <strong>Website:</strong> <a href={place.website} target="_blank" rel="noopener noreferrer">{place.website}</a>
              </p>
            </div>
            <button 
              className="btn btn-primary align-self-start"
              onClick={() => handleAddToPlan(place)}
            >
              Add to Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
