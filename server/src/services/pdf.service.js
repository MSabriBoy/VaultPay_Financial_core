import fs from "fs";
import path from "path";

import PDFDocument from "pdfkit";

import receiptPdfTemplate from "../templates/receiptPdf.template.js";

const generateReceiptPdf = (invoice) => {
  return new Promise((resolve, reject) => {
    const receiptsDirectory = path.join(
      process.cwd(),
      "src",
      "storage",
      "receipts"
    );

    if (!fs.existsSync(receiptsDirectory)) {
      fs.mkdirSync(receiptsDirectory, {
        recursive: true,
      });
    }

    const fileName = `Receipt-${invoice.invoiceNumber}.pdf`;

    const filePath = path.join(
      receiptsDirectory,
      fileName
    );

    const document = new PDFDocument({
      margin: 50,
      size: "A4",
    });

    const stream = fs.createWriteStream(filePath);

    document.pipe(stream);

    receiptPdfTemplate(
      document,
      invoice
    );

    document.end();

    stream.on("finish", () => {
      resolve({
        fileName,
        filePath,
      });
    });

    stream.on("error", reject);
  });
};

export {
  generateReceiptPdf,
};