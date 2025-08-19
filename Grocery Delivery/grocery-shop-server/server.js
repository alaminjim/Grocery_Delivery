import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import useRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();

const allowedOrigins = ["http://localhost:5173"];

// middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api working this port");
});

app.use("/api/user", useRouter);

app.listen(port, () => {
  console.log(`Server is Running port : ${port}`);
});
