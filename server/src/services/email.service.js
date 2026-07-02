import transporter from "../config/mail.js";
import env from "../config/env.js";

const sendReceiptEmail = async (invoice) => {
  await transporter.sendMail({
    from: env.mail.from,
    to: invoice.client.email,
    subject: `Payment Receipt - ${invoice.invoiceNumber}`,
    html: `
      <h2>Payment Successful</h2>

      <p>Hello ${invoice.client.name},</p>

      <p>Your payment has been received successfully.</p>

      <p><strong>Invoice:</strong> ${invoice.invoiceNumber}</p>

      <p><strong>Amount:</strong> ${invoice.currency} ${invoice.amount}</p>

      <p>Thank you for choosing Nexus Corporate Services.</p>
    `,
    attachments: [
      {
        filename: invoice.receiptFileName,
        path: invoice.receiptPath,
      },
    ],
  });
};

export { sendReceiptEmail };