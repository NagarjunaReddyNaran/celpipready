import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
export const PLANS = {
  standard: { name: "Standard", price: 9.99, priceId: process.env.STRIPE_STANDARD_PRICE_ID!, interval: "month" },
  premium:  { name: "Premium",  price: 19.99, priceId: process.env.STRIPE_PREMIUM_PRICE_ID!,  interval: "month" },
  exampack: { name: "Exam Pack", price: 24.99, priceId: process.env.STRIPE_EXAMPACK_PRICE_ID!, interval: "one_time" }
} as const;
