import path from "path";

const getReceiptFileName = (invoiceNumber) => {
  return `${invoiceNumber}.pdf`;
};

const getReceiptPath = (invoiceNumber) => {
  return path.join(
    process.cwd(),
    "src",
    "storage",
    "receipts",
    getReceiptFileName(invoiceNumber)
  );
};

export { getReceiptFileName, getReceiptPath };