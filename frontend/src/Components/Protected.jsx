import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children ,role}) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    // if role is required (like ADMIN) but user is not admin → redirect
    return <Navigate to="/notes" />;
  }
  
  return children;
}
