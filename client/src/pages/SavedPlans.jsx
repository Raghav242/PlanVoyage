import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SavedPlans() {
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editedName, setEditedName] = useState("");

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

  const handleCreatePlan = async () => {
    const name = prompt("Enter a name for your new plan:");
    if (!name?.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/plans`,
        { name, description: "", userId: user.id },
        { withCredentials: true }
      );
      setPlans((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Failed to create plan:", error);
      alert("Error creating plan");
    }
  };

  const handleEditClick = (plan) => {
    setEditingPlanId(plan.id);
    setEditedName(plan.name);
  };

  const handleEditSubmit = async (planId) => {
    if (!editedName.trim()) return;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/plans/${planId}`,
        { name: editedName },
        { withCredentials: true }
      );
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === planId ? { ...plan, name: res.data.name } : plan
        )
      );
      setEditingPlanId(null);
    } catch (err) {
      console.error("Error updating plan name:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mt-4 mb-0">My Saved Plans</h2>
        <button className="btn btn-outline-primary" onClick={handleCreatePlan}>
          + Create Plan
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : plans.length === 0 ? (
        <p className="text-center">You don't have any saved plans yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4 text-center">
          {plans.map((plan) => (
            <div className="col" key={plan.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    {editingPlanId === plan.id ? (
                      <input
                        className="form-control text-center mb-2"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onBlur={() => handleEditSubmit(plan.id)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleEditSubmit(plan.id)
                        }
                        autoFocus
                      />
                    ) : (
                      <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                        <h4 className="card-title mb-0">{plan.name}</h4>
                        <button
                          className="btn btn-sm btn-link p-0 text-primary"
                          onClick={() => handleEditClick(plan)}
                          title="Edit name"
                        >
                          ✏️
                        </button>
                      </div>
                    )}

                    {plan.description && (
                      <p className="text-muted">{plan.description}</p>
                    )}
                    <p className="small text-muted">
                      {plan.places?.length || 0} place
                      {plan.places?.length !== 1 ? "s" : ""}
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
