import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { token, user } = useAuthStore();
  const location = useLocation();

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (requiredRole) {
    // Permitir equivalentes de profesor
    if (
      requiredRole === "TEACHER" &&
      !["TEACHER", "PROFESSOR", "professor"].includes(user?.role)
    ) {
      return <Navigate to="/unauthorized" replace />;
    }
    if (requiredRole !== "TEACHER" && user?.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 