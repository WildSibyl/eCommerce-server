import Stripe from "stripe";
import Order from "../models/Order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getStripeConfig = async (req, res) => {
  try {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    res.status(200).json({ publishableKey });
  } catch (error) {
    console.error("Error fetching Stripe config:", error);
    res.status(500).json({ error: "Failed to fetch Stripe config" });
  }
};

export const createPaymentIntent = async (req, res) => {
  const { items, shipping, billing, fee, total } = req.body;
  const userId = req.user?.id || null; // or from token

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

    await Order.create({
      userId,
      items,
      shipping,
      billing,
      fee,
      total,
      status: "pending",
      stripePaymentIntentId: paymentIntent.id,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};
