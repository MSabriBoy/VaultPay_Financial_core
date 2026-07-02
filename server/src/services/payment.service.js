import stripe from "../config/stripe.js";

import Invoice from "../models/Invoice.js";

import ApiError from "../utils/ApiError.js";

import { ROLES } from "../constants/roles.js";
import { INVOICE_STATUS } from "../constants/invoiceStatus.js";

import env from "../config/env.js";

const createStripeCheckoutSession = async (invoiceId, user) => {
  const invoice = await Invoice.findById(invoiceId).populate(
    "client",
    "name email"
  );

  if (!invoice) {
    throw new ApiError(404, "Invoice not found.");
  }

  if (
    user.role === ROLES.CLIENT &&
    invoice.client._id.toString() !== user._id.toString()
  ) {
    throw new ApiError(403, "Access denied.");
  }

  if (invoice.status === INVOICE_STATUS.PAID) {
    throw new ApiError(400, "Invoice has already been paid.");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    customer_email: invoice.client.email,

    line_items: [
      {
        quantity: 1,

        price_data: {
          currency: invoice.currency.toLowerCase(),

          unit_amount: invoice.amount * 100,

          product_data: {
            name: invoice.invoiceNumber,
            description: invoice.description,
          },
        },
      },
    ],

    success_url: `${env.clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

    cancel_url: `${env.clientUrl}/invoice/${invoice._id}`,

    metadata: {
      invoiceId: invoice._id.toString(),
      invoiceNumber: invoice.invoiceNumber,
      clientId: invoice.client._id.toString(),
      amount: invoice.amount.toString(),
      currency: invoice.currency,
    },
  });

  invoice.stripeCheckoutSessionId = session.id;

  await invoice.save();

  return session;
};

export { createStripeCheckoutSession };