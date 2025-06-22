import { Router } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const checkoutRouter = Router();

// checkoutRouter.route("/");

checkoutRouter.route("/config").get(async (req, res) => {
  try {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    res.status(200).json({ publishableKey });
  } catch (error) {
    console.error("Error fetching Stripe config:", error);
    res.status(500).json({ error: "Failed to fetch Stripe config" });
  }
});

checkoutRouter.route("/create-payment-intent").post(async (req, res) => {
  const { items, shipping, billing, fee, total } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
      metadata: {
        items: JSON.stringify(items),
        shipping: JSON.stringify(shipping),
        billing: JSON.stringify(billing),
        fee: fee.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

export default checkoutRouter;
