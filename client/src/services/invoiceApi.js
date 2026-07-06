import apiClient from "./apiClient";

const createInvoice = async (invoiceData) => {
  const response = await apiClient.post(
    "/invoices",
    invoiceData
  );

  return response.data;
};

const getInvoices = async () => {
  const response = await apiClient.get(
    "/invoices"
  );

  return response.data;
};

const getInvoiceDetails = async (invoiceId) => {
  const response = await apiClient.get(
    `/invoices/${invoiceId}`
  );

  return response.data;
};

const downloadReceipt = async (invoiceId) => {
  const response = await apiClient.get(
    `/invoices/${invoiceId}/receipt`,
    {
      responseType: "blob",
    }
  );

  return response;
};

export {
  createInvoice,
  getInvoices,
  getInvoiceDetails,
  downloadReceipt,
};