import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { USER_ROLES } from "../constants/roles";

const CheckLoginStatus = () => {
  const user = useAuthStore.getState().user;

  if (!user) {
    return <Outlet />;
  }

  const permissionLevel = user.role;

  if (permissionLevel === USER_ROLES.USER_MANAGER) {
    return <Navigate to="/user-manager" />;
  } else if (permissionLevel === USER_ROLES.DISTRIBUTOR_MANAGER) {
    return <Navigate to="/DisDashboard" />;
  } else if (permissionLevel === USER_ROLES.INVENTORY_MANAGER) {
    return <Navigate to="/inventory-manager" />;
  } else if (permissionLevel === USER_ROLES.SUPPLIER_CHAIN_SUPERVISOR) {
    return <Navigate to="/supplier-chain-supervisor" />;
  } else if (permissionLevel === USER_ROLES.EXPORT_MANAGER) {
    return <Navigate to="/export-manager" />;
  } else if (permissionLevel === USER_ROLES.DONATION_MANAGER) {
    return <Navigate to="/donation-manager" />;
  } else if (permissionLevel === USER_ROLES.SHOWROOM_AND_SALES_MANAGER) {
    return <Navigate to="/showroom-and-sales-manager" />;
  } else if (permissionLevel === USER_ROLES.DISTRIBUTORS) {
    return <Navigate to="/distributors" />;
  } else {
    return <Outlet />;
  }
};

export default CheckLoginStatus;
