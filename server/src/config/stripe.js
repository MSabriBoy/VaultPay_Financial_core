import Stripe from "stripe";
import env from "./env.js";

const stripe = new Stripe(env.stripe.secretKey/*, {
  apiVersion: "2025-06-30.basil",
}*/);

export default stripe;