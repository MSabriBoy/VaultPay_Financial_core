import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { ROLES } from "../constants/roles";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== ROLES.ADMIN) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;