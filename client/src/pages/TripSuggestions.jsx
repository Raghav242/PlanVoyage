import React, { useEffect, useState } from "react";

export default function TripSuggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/suggestions`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((error) => console.error("Error fetching suggestions:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Trip Suggestions</h2>
      {suggestions.length === 0 ? (
        <p>No trip suggestions found.</p>
      ) : (
        <ul className="list-group">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="list-group-item">
              <strong>{suggestion.title}</strong> - Suggested by {suggestion.user?.username}
              <p>{suggestion.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
