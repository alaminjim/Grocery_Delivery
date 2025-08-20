import express from "express";
import { upload } from "../config/multer.js";
import { authSeller } from "../middlewares/authSeller.js";
import {
  addProducts,
  changeStocks,
  productByIds,
  productLists,
} from "../controllers/productControllers.js";

const productRoute = express.Router();

productRoute.post("/add", upload.array("images", 5), authSeller, addProducts);
productRoute.get("/list", productLists);
productRoute.get("/id/:id", productByIds);
productRoute.post("/stock", authSeller, changeStocks);

export default productRoute;
