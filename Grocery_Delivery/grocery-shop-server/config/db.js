import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DataBase Connected")
    );
    mongoose.connect(`${process.env.MONGODB_URI}/greencart`);
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
