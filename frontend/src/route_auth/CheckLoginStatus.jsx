import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
//redirect 
const CheckLoginStatus = () => {
  const user = useAuthStore.getState().user;

  if (!user) {
    return <Outlet />;
  }

  return <Outlet />;
};

export default CheckLoginStatus;
