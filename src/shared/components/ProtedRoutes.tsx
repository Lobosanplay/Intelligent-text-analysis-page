import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoutes() {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
