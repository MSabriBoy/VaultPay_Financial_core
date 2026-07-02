import stripe from "../config/stripe.js";
import env from "../config/env.js";

import Invoice from "../models/Invoice.js";
import { INVOICE_STATUS } from "../constants/invoiceStatus.js";
import { generateReceiptPdf } from "../services/pdf.service.js";
import { sendReceiptEmail } from "../services/email.service.js";

const handleStripeWebhook = async (req, res) => {
    const signature = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            env.stripe.webhookSecret
        );
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid webhook signature.",
        });
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;

            const invoice = await Invoice.findById(
                session.metadata.invoiceId
            );

            if (!invoice) {
                break;
            }

            invoice.status = INVOICE_STATUS.PAID;

            invoice.paidAt = new Date();

            invoice.stripePaymentIntentId = session.payment_intent;

            await invoice.populate("client", "name email");

            const receipt = await generateReceiptPdf(invoice);

            invoice.receiptFileName = receipt.fileName;

            invoice.receiptPath = receipt.filePath;

            await invoice.save();

            try {
                await sendReceiptEmail(invoice);
            } catch (error) {
                console.error("Receipt email failed:", error.message);
            }

            console.log(`Invoice ${invoice.invoiceNumber} marked as PAID`);
            break;
        }

        default:
            console.log(`Unhandled event: ${event.type}`);
    }

    res.status(200).json({
        received: true,
    });
};

export { handleStripeWebhook };