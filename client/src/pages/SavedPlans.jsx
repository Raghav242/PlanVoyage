import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SavedPlans() {
  const { user } = useAuthUser();
  const navigate = useNavigate();
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

  const handleView = (plan) => {
    navigate(`/view-plan/${plan.id}`, { state: plan });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mt-4 mb-5">My Saved Plans</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : plans.length === 0 ? (
        <p className="text-center">You don't have any saved plans yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {plans.map((plan) => (
            <div className="col" key={plan.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="card-title">{plan.name}</h4>
                    {plan.description && (
                      <p className="text-muted">{plan.description}</p>
                    )}
                    <p className="small text-muted">
                      {plan.places?.length || 0} place{plan.places?.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <button className="btn btn-primary mt-3" onClick={() => handleView(plan)}>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
