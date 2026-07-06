import { useCallback, useEffect, useState } from "react";

import { getClients } from "../services/adminApi";

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getClients();

      setClients(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ??
          "Failed to load clients."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    loading,
    error,
    refresh: fetchClients,
  };
};

export default useClients;