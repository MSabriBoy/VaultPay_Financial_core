const generateInvoiceNumber = (sequenceNumber) => {
  const year = new Date().getFullYear();

  return `VP-${year}-${String(sequenceNumber).padStart(5, "0")}`;
};

export default generateInvoiceNumber;