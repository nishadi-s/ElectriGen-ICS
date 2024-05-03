import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
//for frontend protection to check wether logged in or not
const PrivateRoute = () => {
  // permissionLevel is an array of strings
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/new-login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
