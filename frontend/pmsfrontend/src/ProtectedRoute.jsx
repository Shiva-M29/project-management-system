
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  

  return <Outlet />;
}
