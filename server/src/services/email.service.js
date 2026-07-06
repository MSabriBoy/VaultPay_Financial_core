import transporter from "../config/mail.js";
import env from "../config/env.js";

import receiptEmailTemplate from "../templates/receiptEmail.template.js";

const sendReceiptEmail = async (invoice) => {
  await transporter.sendMail({
    from: env.mail.from,

    to: invoice.client.email,

    replyTo: env.mail.from,

    subject: `Payment Receipt • ${invoice.invoiceNumber} • VaultPay`,

    html: receiptEmailTemplate(invoice),

    attachments: [
      {
        filename: invoice.receiptFileName,
        path: invoice.receiptPath,
      },
    ],
  });
};

export {
  sendReceiptEmail,
};