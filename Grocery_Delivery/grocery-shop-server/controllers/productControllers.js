import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import fs from "fs";

// add-product
export const addProducts = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    if (!images || images.length === 0)
      return res.json({ success: false, message: "No images provided" });

    const imgURL = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        fs.unlinkSync(file.path); // remove temp file
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imgURL });
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
// get all products
export const productLists = async (req, res) => {
  try {
    const product = await Product.find({});
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get single product
export const productByIds = async (req, res) => {
  try {
    const { id } = req.params; // changed to params
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// change stock
export const changeStocks = async (req, res) => {
  try {
    const { id, inStock } = req.body; // field name fixed
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
