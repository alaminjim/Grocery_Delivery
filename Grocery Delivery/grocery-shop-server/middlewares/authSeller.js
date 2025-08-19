import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (tokenDecoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
