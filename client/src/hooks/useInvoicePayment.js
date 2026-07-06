import { useState } from "react";

import { createCheckoutSession } from "../services/paymentApi";

const useInvoicePayment = () => {
  const [loading, setLoading] = useState(false);

  const startPayment = async (invoiceId) => {
    setLoading(true);

    try {
      const response = await createCheckoutSession(
        invoiceId
      );

      window.location.href =
        response.data.checkoutUrl;
    } finally {
      setLoading(false);
    }
  };

  return {
    startPayment,
    loading,
  };
};

export default useInvoicePayment;