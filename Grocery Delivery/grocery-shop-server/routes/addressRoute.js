import express from "express";
import authUser from "../middlewares/authUser.js";
import { addAddress, getAddress } from "../controllers/AddressControllers.js";

const addressRoute = express.Router();

addressRoute.post("/add", authUser, addAddress);
addressRoute.get("/get", authUser, getAddress);

export default addressRoute;
