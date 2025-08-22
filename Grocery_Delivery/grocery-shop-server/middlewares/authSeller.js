import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  const token = req.cookies.sellerToken;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.sellerId = decoded.email;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
