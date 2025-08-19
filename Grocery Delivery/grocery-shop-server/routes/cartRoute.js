import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { updateCart } from "../controllers/cartControllers.js";

const cartRoutes = express.Router();

cartRoutes.post("/update", authSeller, updateCart);

export default cartRoutes;
