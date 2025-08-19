import express from "express";
import { register } from "../controllers/useControllers.js";

const useRouter = express.Router();

useRouter.post("/register", register);

export default useRouter;
