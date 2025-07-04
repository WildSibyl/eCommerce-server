import Stripe from "stripe";
import Order from "../models/Order.js";
import { generateOrderId } from "../utils/generateOrderId.js";
import DiscountCode from "../models/DiscountCode.js";

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
  const { items, shipping, billing, fee, discountCode, total } = req.body;
  const userId = req.userId || null; // or from token

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
      metadata: {
        items: JSON.stringify(items),
        shipping: JSON.stringify(shipping),
        billing: JSON.stringify(billing),
        discountCode: discountCode ? discountCode.toString() : null,
        fee: fee.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    let NewOrder;
    let tries = 0;
    const maxTries = 5;

    while (!NewOrder && tries < maxTries) {
      const orderId = generateOrderId();
      try {
        NewOrder = await Order.create({
          orderId,
          userId,
          items,
          shipping,
          billing,
          fee,
          discountCode,
          total,
          status: "pending",
          stripePaymentIntentId: paymentIntent.id,
        });
      } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
          tries++;
        } else {
          throw err;
        }
      }
    }

    if (!NewOrder) {
      return res.status(500).json({ error: "Failed to create unique orderId" });
    }

    console.log("New Order created:", NewOrder);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: NewOrder.orderId,
    });
    console.log("response sent with clientSecret and orderId", res.json);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};
