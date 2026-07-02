import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const generateReceiptPdf = (invoice) => {
  return new Promise((resolve, reject) => {
    const receiptsDirectory = path.join(
      process.cwd(),
      "src",
      "storage",
      "receipts"
    );

    if (!fs.existsSync(receiptsDirectory)) {
      fs.mkdirSync(receiptsDirectory, { recursive: true });
    }

    const fileName = `Receipt-${invoice.invoiceNumber}.pdf`;

    const filePath = path.join(receiptsDirectory, fileName);

    const document = new PDFDocument({
      margin: 50,
    });

    const stream = fs.createWriteStream(filePath);

    document.pipe(stream);

    // ---------- Header ----------

    document
      .fontSize(24)
      .fillColor("#1f2937")
      .text("Nexus Corporate Services");

    document
      .fontSize(12)
      .fillColor("gray")
      .text("Official Payment Receipt");

    document.moveDown(2);

    // ---------- Paid ----------

    document
      .fontSize(22)
      .fillColor("green")
      .text("PAID", {
        align: "right",
      });

    document.moveDown();

    // ---------- Receipt ----------

    document
      .fontSize(14)
      .fillColor("black")
      .text(`Invoice : ${invoice.invoiceNumber}`);

    document.text(`Client : ${invoice.client.name}`);

    document.text(`Email : ${invoice.client.email}`);

    document.text(`Amount : ${invoice.currency} ${invoice.amount}`);

    document.text(`Description : ${invoice.description}`);

    document.text(
      `Paid At : ${invoice.paidAt.toLocaleString()}`
    );

    document.text(
      `Payment Intent : ${invoice.stripePaymentIntentId}`
    );

    document.moveDown(2);

    document
      .fontSize(11)
      .fillColor("gray")
      .text(
        "Thank you for your payment.",
        {
          align: "center",
        }
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

export { generateReceiptPdf };