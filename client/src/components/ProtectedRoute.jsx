import { Navigate } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthUser();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
}

export default ProtectedRoute;
