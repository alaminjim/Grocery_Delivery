import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import User from "../models/User.js";

// placeOrder with Stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!req.user?.id)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    if (!items || items.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No items provided" });
    if (!address)
      return res
        .status(400)
        .json({ success: false, message: "Address missing" });

    const productData = [];
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // tax

    const order = await Order.create({
      userId: req.user.id,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.floor(item.price * 1.02 * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "https://checkout.stripe.com/success",
      cancel_url: "https://checkout.stripe.com/cancel",
      metadata: { orderId: order._id.toString(), userId: req.user.id },
    });

    res.json({ success: true, url: session.url, order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// stripe webhooks to verify

export const stripeWebhooks = (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOKS
    );
  } catch (error) {
    res.status(400).send(`webHooks Error: ${error.message}`);
  }

  // handle event

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting metadata
      const session = stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId, userId } = session.data[0].metadata;
      Order.findByIdAndUpdate(orderId, { isPaid: true });
      User.findByIdAndUpdate(userId, { cartItems: {} });
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting metadata
      const session = stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId } = session.data[0].metadata;
      Order.findByIdAndDelete(orderId);
      break;
    }

    default:
      console.error(`Unhandled event type: ${event.type}`);
      break;
  }
  res.json({ received: true });
};

// placeOrder with COD
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;

    // validation
    if (!req.user?.id)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    if (!items || items.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No items provided" });
    if (!address)
      return res
        .status(400)
        .json({ success: false, message: "Address missing" });

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) continue;
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId: req.user.id,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    res.json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user orders
export const getUserOrders = async (req, res) => {
  try {
    if (!req.user?.id)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const orders = await Order.find({ userId: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all orders for seller/admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product") // product populate
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
