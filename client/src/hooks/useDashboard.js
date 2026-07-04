import { useCallback, useEffect, useState } from "react";

import useAuth from "./useAuth";

import {
  getAdminDashboard,
  getClientDashboard,
} from "../services/dashboardApi";

import { ROLES } from "../constants/roles";

const useDashboard = () => {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response =
        user.role === ROLES.ADMIN
          ? await getAdminDashboard()
          : await getClientDashboard();

      setDashboard(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ??
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    fetchDashboard();
  }, [authLoading, fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    refresh: fetchDashboard,
  };
};

export default useDashboard;