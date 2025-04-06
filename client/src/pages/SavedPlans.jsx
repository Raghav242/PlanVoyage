import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "../context/AuthContext";

export default function Plans() {
  const { user } = useAuthUser();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/plans/user/${user.id}`, {
        withCredentials: true,
      })
      .then((res) => setPlans(res.data))
      .catch((err) => console.error("Error loading saved plans:", err))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Saved Plans</h1>

      {loading ? (
        <p>Loading...</p>
      ) : plans.length === 0 ? (
        <p>No saved plans yet.</p>
      ) : (
        <div className="accordion" id="plansAccordion">
          {plans.map((plan, i) => (
            <div className="accordion-item" key={plan.id}>
              <h2 className="accordion-header" id={`heading-${plan.id}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${plan.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${plan.id}`}
                >
                  {plan.name}
                </button>
              </h2>
              <div
                id={`collapse-${plan.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${plan.id}`}
                data-bs-parent="#plansAccordion"
              >
                <div className="accordion-body">
                  {plan.places?.length > 0 ? (
                    <ul>
                      {plan.places.map((place) => (
                        <li key={place.id}>
                          <strong>{place.name}</strong>
                          {place.address && <> – {place.address}</>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No places added to this plan yet.</p>
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
