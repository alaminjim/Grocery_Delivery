import express from "express";
import {
  isAuth,
  login,
  logout,
  register,
} from "../controllers/useControllers.js";
import authUser from "../middlewares/authUser.js";

const useRouter = express.Router();

useRouter.post("/register", register);
useRouter.post("/login", login);
useRouter.get("/is-auth", authUser, isAuth);
useRouter.get("/logout", authUser, logout);

export default useRouter;
