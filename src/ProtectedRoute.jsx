import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children}) {
  const token = localStorage.getItem("adminToken");
  // redirect to the actual admin login route defined in AppRoutes ("/admin")
  return token ? children : <Navigate to="/admin" />;
}
