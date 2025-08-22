import Address from "../models/Address.js";

// add address
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    await Address.create({ ...address, userId: req.user.id });
    res.json({ success: true, message: "Cart address added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get-address

export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
