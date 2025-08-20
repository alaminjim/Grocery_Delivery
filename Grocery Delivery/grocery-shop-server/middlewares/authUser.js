import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: tokenDecoded._id || tokenDecoded.id }; // ensure correct user id
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, message: "Not Authorized" });
  }
};

export default authUser;
