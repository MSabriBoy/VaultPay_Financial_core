import { useCallback, useEffect, useState } from "react";

import { getInvoices } from "../services/invoiceApi";

const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getInvoices();

      setInvoices(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ??
          "Failed to load invoices."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return {
    invoices,
    loading,
    error,
    refresh: fetchInvoices,
  };
};

export default useInvoices;