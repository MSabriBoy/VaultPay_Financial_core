import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getInvoiceDetails } from "../services/invoiceApi";

const useInvoiceDetail = () => {
  const { invoiceId } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvoice = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getInvoiceDetails(
        invoiceId
      );

      setInvoice(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ??
          "Failed to load invoice."
      );
    } finally {
      setLoading(false);
    }
  }, [invoiceId]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  return {
    invoice,
    loading,
    error,
    refresh: fetchInvoice,
  };
};

export default useInvoiceDetail;