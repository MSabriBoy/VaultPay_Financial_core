import asyncHandler from "../utils/asyncHandler.js";

import { createStripeCheckoutSession } from "../services/payment.service.js";

const createCheckoutSession = asyncHandler(async (req, res) => {
  const session = await createStripeCheckoutSession(
    req.params.invoiceId,
    req.user
  );

  res.status(200).json({
    success: true,
    data: {
      sessionId: session.id,
      checkoutUrl: session.url,
    },
  });
});

export { createCheckoutSession };