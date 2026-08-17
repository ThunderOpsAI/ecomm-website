import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";

export const stripe = new Stripe(stripeApiKey, {
  typescript: true,
});

export default stripe;
