import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import useRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import productRoute from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import addressRoute from "./routes/AddressRoute.js";
import orderRoutes from "./routes/orderRouts.js";
import dotenv from "dotenv";
import { stripeWebhooks } from "./controllers/orderController.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
connectCloudinary();

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api working this port");
});

app.use("/api/user", useRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoute);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
  console.log(`Server is Running port : ${port}`);
});
