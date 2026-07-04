import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { ROLES } from "../constants/roles";

const ClientRoute = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== ROLES.CLIENT) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ClientRoute;